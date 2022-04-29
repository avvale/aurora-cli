import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { CreatedUserEvent } from './created-user.event';

@EventsHandler(CreatedUserEvent)
export class CreatedUserEventHandler implements IEventHandler<CreatedUserEvent>
{
    handle(event: CreatedUserEvent)
    {
        // console.log('CreatedUserEvent: ', event);
    }
}