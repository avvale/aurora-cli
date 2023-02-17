import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { DeletedHttpCommunicationEvent } from './deleted-http-communication.event';

@EventsHandler(DeletedHttpCommunicationEvent)
export class DeletedHttpCommunicationEventHandler implements IEventHandler<DeletedHttpCommunicationEvent>
{
    handle(event: DeletedHttpCommunicationEvent): void
    {
        // console.log('DeletedHttpCommunicationEvent: ', event);
    }
}