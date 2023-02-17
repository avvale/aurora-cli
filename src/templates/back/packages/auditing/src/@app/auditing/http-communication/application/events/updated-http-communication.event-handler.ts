import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { UpdatedHttpCommunicationEvent } from './updated-http-communication.event';

@EventsHandler(UpdatedHttpCommunicationEvent)
export class UpdatedHttpCommunicationEventHandler implements IEventHandler<UpdatedHttpCommunicationEvent>
{
    handle(event: UpdatedHttpCommunicationEvent): void
    {
        // console.log('UpdatedHttpCommunicationEvent: ', event);
    }
}