import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { CreatedHttpCommunicationEvent } from './created-http-communication.event';

@EventsHandler(CreatedHttpCommunicationEvent)
export class CreatedHttpCommunicationEventHandler implements IEventHandler<CreatedHttpCommunicationEvent>
{
    handle(event: CreatedHttpCommunicationEvent): void
    {
        // console.log('CreatedHttpCommunicationEvent: ', event);
    }
}