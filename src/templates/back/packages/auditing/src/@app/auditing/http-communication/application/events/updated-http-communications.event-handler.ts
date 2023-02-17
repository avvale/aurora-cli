import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { UpdatedHttpCommunicationsEvent } from './updated-http-communications.event';

@EventsHandler(UpdatedHttpCommunicationsEvent)
export class UpdatedHttpCommunicationsEventHandler implements IEventHandler<UpdatedHttpCommunicationsEvent>
{
    handle(event: UpdatedHttpCommunicationsEvent): void
    {
        // console.log('UpdatedHttpCommunicationsEvent: ', event);
    }
}