import { DateInterface } from "./date";

export interface EventInterface {
    id: string;
    name: string;
    creatorId: string;
    description: string;
    registeredUsers: string[];
    image: string;
    eventDate:DateInterface;
};
