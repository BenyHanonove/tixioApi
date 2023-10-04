import { Document } from "mongoose";

export interface AuthenticationInterface extends Document{
    password: string;
    salt: string;
    sessionToken: string;
};