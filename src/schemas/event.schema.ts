import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Date } from './date.schema';

export type UserDocument = Document;

@Schema()
export class Event {
    @Prop({ required: true})
    name:string;

    @Prop({ required: true})
    creatorId:string;

    @Prop({ required: true})
    description:string;

    @Prop({ required: true})
    image:string;
    
    @Prop({ type: Date, required: true })
    eventDate: Date;
    
    @Prop({ type: Map, of: Boolean, default: new Map() })
    registeredUsers: Map<string, boolean>;
};
export const eventSchema = SchemaFactory.createForClass(Event);


const EventModel = mongoose.model("Event",eventSchema);

// Function to get all events from DB
export const getEvents = () => EventModel.find();

// Function to get single event by id from DB
export const getEventById = (id: string) => EventModel.findById(id);

// Function to create a new event in DB
export const createEvent = async (values: Record<string, any>) => {
    return await new EventModel(values).save().then((event) => event.toObject());
};

// Function to delete an event from DB
export const deleteEvent = (id: string) => EventModel.findOneAndDelete({ _id: id });

// Function to find a single event and update it in the DB
export const updateEventById = (id: string, values: Record<string, any>) => EventModel.findByIdAndUpdate(id, values);