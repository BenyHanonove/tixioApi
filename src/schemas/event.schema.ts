import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
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

    @Prop({default:[] ,type:[String]})
    registeredUsers:string[];

    @Prop({ required: true})
    image:string;

    @Prop({ type: Date, required: true })
    authentication: Date;

};

export const eventSchema = SchemaFactory.createForClass(Event);