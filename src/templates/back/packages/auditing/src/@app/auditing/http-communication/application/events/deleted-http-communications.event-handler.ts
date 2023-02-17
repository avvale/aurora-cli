import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { DeletedHttpCommunicationsEvent } from './deleted-http-communications.event';

@EventsHandler(DeletedHttpCommunicationsEvent)
export class DeletedHttpCommunicationsEventHandler implements IEventHandler<DeletedHttpCommunicationsEvent>
{
    handle(event: DeletedHttpCommunicationsEvent): void
    {
        // console.log('DeletedHttpCommunicationsEvent: ', event);
    }
}