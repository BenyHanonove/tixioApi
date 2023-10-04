import { HttpStatus, Inject, Injectable} from '@nestjs/common';
import { Response } from 'express';
import { Model } from 'mongoose';
import {v4 as uuidv4} from "uuid";
import { random ,generateAuthenticationHash ,doesPasswordMatch} from 'src/utils/encryption';
import { UserInterface } from 'src/interfaces/user';
import { 
    getUserByEmail,
    createUser,
    deleteUser,
    updateUserById,
    getUserByIdWithAuthentication
} from 'src/schemas/user.schema';

@Injectable()
export class UserService {
    constructor(
        @Inject('USER_MODEL')
        private userModel : Model <UserInterface>,
    ){}

    //Function to create new user
    async createNewUser(userData: UserInterface ,res: Response){
        try{
            const { email, authentication, username, fullName } = userData;

            if (!email || !authentication.password || !username || !fullName) {
                return res.status(HttpStatus.BAD_REQUEST).json({ msg: "Missing fields: email, authentication.password, username, or fullName" }).end();
            };

            const existingUser = await getUserByEmail(email);

            if (existingUser) {
                return res.status(HttpStatus.BAD_REQUEST).json({ msg: "The email address is already in use by another user." }).end();
            };

            const salt = random();
            const sessionToken = uuidv4();


            const user = await createUser({
                fullName,
                username,
                email,
                authentication: {
                    salt,
                    password: generateAuthenticationHash(salt, authentication.password),
                    sessionToken
                },
            });

            return res.status(HttpStatus.OK).json({user}).end();

        }catch(err){
            console.log(err);
            return res.status(HttpStatus.BAD_REQUEST).json({ msg: "An error occurred while creating a new user." }).end();
        };
    };

    //Function to search for new user by email
    async findUserByEmail(email:string, res: Response){
        try {
            const user = await  getUserByEmail(email);

            if(user){
                return res.status(HttpStatus.OK).json(user).end();
            }else{
                return res.status(HttpStatus.NOT_FOUND).json({ msg: "User not found." }).end();
            };

        } catch (err) {
            console.log(err);
            return res.status(HttpStatus.BAD_REQUEST).json({ msg: "An error occurred while searching for the user." }).end();
        }
    };

    //Function to search for new user by email
    async deleteUserById(id:string, res: Response){
        try {
            const user = await deleteUser(id);

            if(user){
                return res.status(HttpStatus.OK).json({ msg: "User found and deleted."}).end();
            }else{
                return res.status(HttpStatus.NOT_FOUND).json({ msg: "User not found." }).end();
            };

        } catch (err) {
            console.log(err);
            return res.status(HttpStatus.BAD_REQUEST).json({ msg: "An error occurred while searching for the user." }).end();
        }
    };

        //Function to search for new user by email
        async verifyPassword(userData:UserInterface, res: Response){
            try {
                const user = await getUserByIdWithAuthentication(userData.id);
    
                if(user){

                    const isPasswordMatch = doesPasswordMatch(userData.authentication.password ,user.authentication.salt ,user.authentication.password);

                    if(isPasswordMatch){
                        return res.status(HttpStatus.OK).json({msg:"Password is valid."}).end();
                    }else{
                        return res.status(HttpStatus.BAD_REQUEST).json({msg:"Password is wrong."}).end();
                    }

                }else{
                    return res.status(HttpStatus.NOT_FOUND).json({ msg: "User not found." }).end();
                };
    
            } catch (err) {
                console.log(err);
                return res.status(HttpStatus.BAD_REQUEST).json({ msg: "An error occurred while searching for the user." }).end();
            }
        };

        //Function to search for new user by email
        async updatePassword(userData:UserInterface, res: Response){
            try {

                const user = await getUserByIdWithAuthentication(userData.id);

                const newSalt = random();
                const newSessionToken = uuidv4();

                user.authentication.salt = newSalt;
                user.authentication.sessionToken = newSessionToken;
                user.authentication.password = generateAuthenticationHash(newSalt, userData.authentication.password);

                const updatedUser = await updateUserById(userData.id , user);

                if(updatedUser){
                    return res.status(HttpStatus.OK).json({msg:"Password has been updated."}).end();
                }else{
                    return res.status(HttpStatus.BAD_REQUEST).json({msg:"something went wrong password has't been change."}).end();
                };

            } catch (err) {
                console.log(err);
                return res.status(HttpStatus.BAD_REQUEST).json({ msg: "An error occurred while searching for the user." }).end();
            }
        };


}