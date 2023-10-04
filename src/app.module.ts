import { Module } from '@nestjs/common';
import { UsersModule } from './modules/users/users.module';
import { EventsModule } from './modules/events/events.module';

@Module({
  imports: [UsersModule, EventsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
