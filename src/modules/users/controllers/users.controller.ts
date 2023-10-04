import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Req, Res } from '@nestjs/common';
import { UserService } from '../services/users.service';
import { Request, Response } from 'express';
import { UserInterface } from 'src/interfaces/user';

@Controller('users')
export class UsersController {

    constructor(private UserService:UserService){}

    //Post method to create new user
    @Post("/register")
    async registerUser(
        @Req() req: Request,
        @Res() res: Response,
        @Body() userData: UserInterface,
    ){
        try{
            this.UserService.createNewUser(userData,res);
        }catch(err){
            console.log(err);
            res.status(HttpStatus.BAD_REQUEST).json({ msg: err.message })
        }
    };

    //Get method to get user by email
    @Get("/email/:email")
    findByEmail(
        @Req() req: Request,
        @Res() res: Response,
        @Param("email") email :string
    ) {
        try{
            this.UserService.findUserByEmail(email ,res);
        }catch(err){
            console.log(err);
            res.status(HttpStatus.BAD_REQUEST).json({msg: err})
        }
    };

    //Delete method to delete user by id
    @Delete("/id/:id")
    deleteUser(
        @Req() req: Request,
        @Res() res: Response,
        @Param("id") id: string,
    ) {
        try{
            this.UserService.deleteUserById(id ,res);
        }catch(err){
            console.log(err);
            res.status(HttpStatus.BAD_REQUEST).json({msg: err})
        }
    };


        //Post method to check if passwords matches
        @Post("/verifyPassword")
        authenticatePassword(
            @Req() req: Request,
            @Res() res: Response,
            @Body() userData:UserInterface,
        ) {
            try{
                this.UserService.verifyPassword(userData ,res);
            }catch(err){
                console.log(err);
                res.status(HttpStatus.BAD_REQUEST).json({msg: err})
            }
        };

        //Put method to update user password by id
        @Put("/updatePassword")
        UpdatePassword(
            @Req() req: Request,
            @Res() res: Response,
            @Body() userData:UserInterface,
        ) {
            try{
                this.UserService.updatePassword(userData ,res);
                return;
            }catch(err){
                console.log(err);
                res.status(HttpStatus.BAD_REQUEST).json({msg: err})
            }
        };


};
