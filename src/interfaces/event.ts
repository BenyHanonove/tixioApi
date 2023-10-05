import { DateInterface } from "./date";

export interface EventInterface {
    id: string;
    name: string;
    creatorId: string;
    description: string;
    registeredUsers: Map<String ,boolean>;
    image: string;
    eventDate:DateInterface;
};


export interface EventUserLink{
    userId: string,
    eventId: string,
}