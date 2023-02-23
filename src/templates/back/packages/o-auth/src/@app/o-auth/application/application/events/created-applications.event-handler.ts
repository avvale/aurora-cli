import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { CreatedApplicationsEvent } from './created-applications.event';

@EventsHandler(CreatedApplicationsEvent)
export class CreatedApplicationsEventHandler implements IEventHandler<CreatedApplicationsEvent>
{
    handle(event: CreatedApplicationsEvent): void
    {
        // console.log('CreatedApplicationsEvent: ', event);
    }
}