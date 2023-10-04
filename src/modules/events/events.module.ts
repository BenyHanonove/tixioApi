import { Module } from '@nestjs/common';
import { EventsController } from './controllers/events.controller';
import { EventsService } from './services/events.service';
import { eventsProviders } from './providers/events.providers';
import { DatabaseModule } from '../database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [EventsController],
  providers: [
      EventsService,
      ...eventsProviders
  ],
})
export class EventsModule {}
