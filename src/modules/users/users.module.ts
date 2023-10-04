import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { usersProviders } from './providers/ users.providers';
import { UsersController } from './controllers/users.controller';
import { UserService } from './services/users.service';

@Module({
    imports: [DatabaseModule],
    controllers: [UsersController],
    providers: [
        UserService,
        ...usersProviders
    ],
})
export class UsersModule {}