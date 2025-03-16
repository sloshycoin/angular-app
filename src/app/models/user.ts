import { RowDataPacket } from "mysql2/promise";

export interface User extends RowDataPacket {
    id: number;
    username: string;
    email: string;
    password: string;
    signupdate: Date;
    logindate: Date;
}
