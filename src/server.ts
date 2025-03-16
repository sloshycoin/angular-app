import {
  AngularNodeAppEngine,
  createNodeRequestHandler,
  isMainModule,
  writeResponseToNodeResponse,
} from '@angular/ssr/node';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import express from 'express';
import mysql, {
  ConnectionOptions,
  ResultSetHeader,
} from 'mysql2/promise';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import { User } from './app/models/user';

const serverDistFolder = dirname(fileURLToPath(import.meta.url));
const browserDistFolder = resolve(serverDistFolder, '../browser');

const app = express();
const angularApp = new AngularNodeAppEngine();

const jwtSecret = 'Angular_App_Secret_for_JWT'; // Replace with your actual secret

const dbConfig: ConnectionOptions = {
  host: 'localhost',
  database: 'angularapp',
  user: 'angularadmin',
  password: 'appadmin',
};

app.post('/api/users', async (req, res) => {
  const { username, email } = req.body;
  const connection = await mysql.createConnection(dbConfig);
  const [rows] = await connection.query<User[]>('SELECT * FROM users WHERE username = ? OR email = ?', [username, email]);
  await connection.end();
  res.status(200).json(rows);
});

app.post('/api/register', async (req, res) => {
  const connection = await mysql.createConnection(dbConfig);
  const hashedPassword = await bcrypt.hash(req.body.password, 10);
  const [result] = await connection.query<ResultSetHeader>(
    'INSERT INTO users (username, email, password, signupdate, role) VALUES (?, ?, ?, ?, "user")',
    [
      req.body.username,
      req.body.email,
      hashedPassword,
      new Date(),
    ]
  );
  await connection.end();
  
  if (result.affectedRows > 0) {
    res.status(201).json({ message: 'User registered successfully', registered: true });
  }
  else {
    res.status(400).json({ message: 'User registration failed', registered: false });
  }
});

app.post('/api/login', async (req, res) => {
  const connection = await mysql.createConnection(dbConfig);
  const [rows] = await connection.query<User[]>(
    'SELECT * FROM users WHERE username = ?',
    [req.body.username]
  );
  await connection.end();

  const user = rows[0];
  if (user && await bcrypt.compare(req.body.password, user.password)) {
    const token = jwt.sign({ id: user.id, name: user.username, email: user.email }, jwtSecret, { expiresIn: '1h' });
    res.status(200).json({ message: 'Login successful', auth: token , role: user.role });
  } else {
    res.status(401).json({ message: 'Invalid credentials', auth: null , role: null });
  }
});

/**
 * Serve static files from /browser
 */
app.use(
  express.static(browserDistFolder, {
    maxAge: '1y',
    index: false,
    redirect: false,
  })
);

/**
 * Handle all other requests by rendering the Angular application.
 */
app.use('/**', (req, res, next) => {
  angularApp
    .handle(req)
    .then((response) =>
      response ? writeResponseToNodeResponse(response, res) : next()
    )
    .catch(next);
});

/**
 * Start the server if this module is the main entry point.
 * The server listens on the port defined by the `PORT` environment variable, or defaults to 4000.
 */
if (isMainModule(import.meta.url)) {
  const port = process.env['PORT'] || 4000;
  app.listen(port, () => {
    console.log(`Node Express server listening on http://localhost:${port}`);
  });
}

/**
 * Request handler used by the Angular CLI (for dev-server and during build) or Firebase Cloud Functions.
 */
export const reqHandler = createNodeRequestHandler(app);
