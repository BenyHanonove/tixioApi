import { Body, Controller, HttpStatus, Post, Req, Res } from '@nestjs/common';
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

        }catch(err){
            console.log(err);
            res.status(HttpStatus.BAD_REQUEST).json({msg:err.message}).end();
        }
    }

}
