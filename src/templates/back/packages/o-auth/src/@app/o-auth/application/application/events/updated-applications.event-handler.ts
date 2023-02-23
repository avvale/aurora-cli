import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { UpdatedApplicationsEvent } from './updated-applications.event';

@EventsHandler(UpdatedApplicationsEvent)
export class UpdatedApplicationsEventHandler implements IEventHandler<UpdatedApplicationsEvent>
{
    handle(event: UpdatedApplicationsEvent): void
    {
        // console.log('UpdatedApplicationsEvent: ', event);
    }
}