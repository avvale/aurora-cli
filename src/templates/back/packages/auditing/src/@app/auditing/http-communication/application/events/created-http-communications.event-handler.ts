import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { CreatedHttpCommunicationsEvent } from './created-http-communications.event';

@EventsHandler(CreatedHttpCommunicationsEvent)
export class CreatedHttpCommunicationsEventHandler implements IEventHandler<CreatedHttpCommunicationsEvent>
{
    handle(event: CreatedHttpCommunicationsEvent): void
    {
        // console.log('CreatedHttpCommunicationsEvent: ', event);
    }
}