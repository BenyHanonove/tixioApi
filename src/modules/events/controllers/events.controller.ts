import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Req, Res } from '@nestjs/common';
import { EventsService } from '../services/events.service';
import { Request , Response} from 'express';
import { EventInterface } from 'src/interfaces/event';

@Controller('events')
export class EventsController {

    constructor(private EventsService:EventsService){}

    @Post("register")
    async registerEvent(
        @Req() req : Request,
        @Res() res: Response,
        @Body() eventData: EventInterface, 
    ){
        try{
            this.EventsService.createNewEvent(eventData ,res);
        }catch(err){
            console.log(err);
            res.status(HttpStatus.BAD_REQUEST).json({msg:err.message}).end();
        };
    };

    @Get("find/id/:id")
    async findEvent(
        @Req() req : Request,
        @Res() res: Response,
        @Param('id') id: string ,
    ){
        try{
            this.EventsService.findEventById(id ,res);
        }catch(err){
            console.log(err);
            res.status(HttpStatus.BAD_REQUEST).json({msg:err.message}).end();
        };
    };

    @Delete('find/id/:id')
    async deleteEvent(
        @Req() req : Request,
        @Res() res: Response,
        @Param('id') id: string ,
    ){
        try{
            this.EventsService.findEventByIdAndDelete(id ,res);
        }catch(err){
            console.log(err);
            res.status(HttpStatus.BAD_REQUEST).json({msg:err.message}).end();
        };
    };

}
