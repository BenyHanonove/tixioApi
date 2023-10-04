import { Prop, Schema } from '@nestjs/mongoose';

@Schema({_id:false})
export class Authentication {
    @Prop({ required: true, select: false })
    password: string;

    @Prop({ required: true, select: false })
    salt: string;

    @Prop({ select: false })
    sessionToken: string;
}
