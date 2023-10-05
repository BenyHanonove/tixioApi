import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { Response } from 'express';
import { Model } from 'mongoose';
import { EventInterface, EventUserLink } from 'src/interfaces/event';
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

    //Function to find event by id and delete
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


    async updateEventById(eventData: Partial<EventInterface>, res: Response) {
        try {
            // Ensure that only the allowed properties are extracted from eventData
            const { name, creatorId, description, image, eventDate } = eventData;
    
            const event = await getEventById(eventData.id);
    
            if (!event) {
                return res.status(HttpStatus.NOT_FOUND).json({ msg: "Event not found." }).end();
            }
    
            // Update only the specified properties
            if (name) event.name = name;
            if (creatorId) event.creatorId = creatorId;
            if (description) event.description = description;
            if (image) event.image = image;
            if (eventDate) event.eventDate = eventDate;
    
            // Save the updated event
            await event.save();
    
            return res.status(HttpStatus.OK).json({ msg: "Event updated successfully." }).end();
        } catch (err) {
            console.log(err);
            res.status(HttpStatus.BAD_REQUEST).json({ msg: err.message }).end();
        }
    }
    


    //Function to get registered users map
    async findMap(id: string ,res: Response){
        try{
            const event = await getEventById(id);

            if(!event){
                return res.status(HttpStatus.NOT_FOUND).json({msg:"didn`t found this event."}).end(); 
            };

            res.status(HttpStatus.OK).json(event.registeredUsers).end();

        }catch(err){
            console.log(err);
            res.status(HttpStatus.BAD_REQUEST).json({msg:err.message}).end();
        }
    };


    //Function to remove element from map of registered users
    async removeUserFromRegisteredUsers(ids: EventUserLink ,res: Response) {
        try {
            const event = await getEventById(ids.eventId);
    
            if (!event) {
                return res.status(HttpStatus.NOT_FOUND).json({ msg: "Event not found." }).end();
            }
    
            const registeredUsers = event.registeredUsers;
    
            if (registeredUsers.has(ids.userId)) {
                registeredUsers.delete(ids.userId);
                await event.save();
                return res.status(HttpStatus.OK).json({ msg: "User removed from registered users." }).end();
            } else {
                return res.status(HttpStatus.NOT_FOUND).json({ msg: "User not found in registered users." }).end();
            }
        } catch (err) {
            console.log(err);
            res.status(HttpStatus.BAD_REQUEST).json({ msg: err.message }).end();
        }
    };


    //Function to add element to map of registered users
    async addUserToRegisteredUsers(ids: EventUserLink ,res: Response) {
        try {
            const event = await getEventById(ids.eventId);
    
            if (!event) {
                return res.status(HttpStatus.NOT_FOUND).json({ msg: "Event not found." }).end();
            }
    
            const registeredUsers = event.registeredUsers;
    
            // Check if the user is already registered
            if (registeredUsers.has(ids.userId)) {
                return res.status(HttpStatus.BAD_REQUEST).json({ msg: "User is already registered for this event." }).end();
            }
    
            // Add the user to registered users
            registeredUsers.set(ids.userId, true);
            await event.save();
            return res.status(HttpStatus.OK).json({ msg: "User added to registered users." }).end();
    
        } catch (err) {
            console.log(err);
            res.status(HttpStatus.BAD_REQUEST).json({ msg: err.message }).end();
        }
    };
    
    

};



