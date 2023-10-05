import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Authentication } from './authentication.schema';

export type UserDocument = Document;

@Schema()
export class User {
    @Prop({ required: true })
    fullName: string;

    @Prop({ required: true })
    username: string;

    @Prop({ required: true })
    email: string;

    @Prop({ type: Authentication, required: true })
    authentication: Authentication;
};

export const userSchema = SchemaFactory.createForClass(User);

const UserModel = mongoose.model("User",userSchema);

//Function to get all the users from DB
export const getUsers = () => UserModel.find();

//Function to get single user by id from DB
export const getUserById = (id:string) => UserModel.findById(id);

//Function to get single user by id from DB with all the data 
export const getUserByIdWithAuthentication = (id:string) => UserModel.findById(id).select('+authentication.password').select('+authentication.salt').select('+authentication.sessionToken');

//Function to get single user by email from DB
export const getUserByEmail = (email:string) => UserModel.findOne({email});

//Function to get the user by session token from DB
export const getUserBySessionToken = (sessionToken: string) => UserModel.findOne({
    "authentication.sessionToken":sessionToken,
});

//Function to create new user in DB
export const createUser = async (values: Record <string ,any>) => {
    return await new UserModel(values).save().then((user)=>user.toObject());
};

//Function to delete user from DB
export const deleteUser = (id: string) => UserModel.findOneAndDelete({_id: id});

//Function to find single user and update him inside DB
export const updateUserById = (id :String ,values: Record<string ,any>) => UserModel.findByIdAndUpdate(id ,values);

// Function to update the session token for a user by ID
export const updateSessionToken = async (userId: string, newSessionToken: string) => {
    try {
        const user = await UserModel.findByIdAndUpdate(userId, {
            'authentication.sessionToken': newSessionToken
        }, { new: true });

        if (!user) {
            throw new Error('User not found');
        }

        return user.toObject();
    } catch (error) {
        throw new Error('Could not update session token: ' + error.message);
    }
};