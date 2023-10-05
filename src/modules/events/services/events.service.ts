import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { Response } from 'express';
import { Model } from 'mongoose';
import { EventInterface } from 'src/interfaces/event';
import {
    createEvent,
    getEventById,
    deleteEvent,
} from "../../../schemas/event.schema";

@Injectable()
export class EventsService {

    constructor(
        @Inject('EVENT_MODEL')
        private eventModel : Model <EventInterface>,
    ){}


    //Function to create new event
    async createNewEvent(eventData: EventInterface ,res: Response){
        try{
            const { name, creatorId, description, image ,eventDate } = eventData;

            if (!name || !creatorId || !description || !image || !eventDate) {
                return res.status(HttpStatus.BAD_REQUEST).json({ msg: "Missing fields: name, creatorId, description, image, or date" }).end();
            };

            // Check properties inside eventDate
            const { calendar, time } = eventDate;
            if (!calendar || !time || calendar.day === undefined || calendar.month === undefined || calendar.year === undefined || time.hours === undefined || time.minutes === undefined) {
                return res.status(HttpStatus.BAD_REQUEST).json({ msg: "Missing or invalid fields inside eventDate" }).end();
            };

            const event = await createEvent({
                name,
                creatorId,
                description,
                image,
                eventDate,
            });

            return res.status(HttpStatus.OK).json({event}).end();

        }catch(err){
            console.log(err);
            res.status(HttpStatus.BAD_REQUEST).json({msg:"error when trying to create new event."});
        }
    };


    //Function to find event by id
    async findEventById(id: string ,res: Response){
        try{
            const event = await getEventById(id);

            if(!event){
                return res.status(HttpStatus.NOT_FOUND).json({msg:"didn`t found this event."}).end(); 
            };

            res.status(HttpStatus.OK).json(event).end();

        }catch(err){
            console.log(err);
            res.status(HttpStatus.BAD_REQUEST).json({msg:err.message}).end();
        }
    };

        //Function to find event by id
    async findEventByIdAndDelete(id: string ,res: Response){
        try{
            const event = await deleteEvent(id);

            if(!event){
                return res.status(HttpStatus.NOT_FOUND).json({msg:"didn`t found this event."}).end(); 
            };

            res.status(HttpStatus.OK).json({msg:"event has been deleted from server."}).end();

        }catch(err){
            console.log(err);
            res.status(HttpStatus.BAD_REQUEST).json({msg:err.message}).end();
        }
    };

}
