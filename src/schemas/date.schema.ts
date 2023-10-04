import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = Document;

//Schema for calendar
@Schema({_id:false})
export class Calendar {
    @Prop({required:true ,min:1 ,max:31})
    day:number;

    @Prop({required:true ,min:1 ,max:12})
    month:number;

    @Prop({required:true ,min:0})
    year:number;
};
export const CalendarSchema = SchemaFactory.createForClass(Calendar);

//Schema for time
@Schema({_id:false})
export class Time {
    @Prop({required:true ,min:0 ,max:23})
    hours:number;

    @Prop({required:true ,min:0 ,max:59})
    minutes:number;
};
export const TimeSchema = SchemaFactory.createForClass(Time);


//Schema for date
@Schema()
export class Date {
    @Prop({ type: Calendar, required: true })
    calendar: Calendar;

    @Prop({ type: Time, required: true })
    time: Time;
};
export const dateSchema = SchemaFactory.createForClass(Date);