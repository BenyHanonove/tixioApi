import { Document } from "mongoose";
import {AuthenticationInterface} from "./authentication"

export interface UserInterface extends Document{
    id:string,
    fullName: string;
    username: string;
    email: string;
    authentication:AuthenticationInterface;
};