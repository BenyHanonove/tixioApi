import { Document } from "mongoose";

export interface DateInterface extends Document{
    calendar:CalendarInterface,
    time:TimeInterface,
};

export interface CalendarInterface extends Document{
    day: number,
    month: number,
    year: number,
}

export interface TimeInterface extends Document{
    hours:number,
    minutes:number,
}