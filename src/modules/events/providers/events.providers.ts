import {Connection} from "mongoose";
import { eventSchema } from "src/schemas/event.schema";


export const eventsProviders = [
    {
        provide: 'EVENT_MODEL',
        useFactory: (connection: Connection) => connection.model('Event', eventSchema),
        inject: ['DATABASE_CONNECTION'],
    },
];