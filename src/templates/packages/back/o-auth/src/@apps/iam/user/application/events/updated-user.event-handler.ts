import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { UpdatedUserEvent } from './updated-user.event';

@EventsHandler(UpdatedUserEvent)
export class UpdatedUserEventHandler implements IEventHandler<UpdatedUserEvent>
{
    handle(event: UpdatedUserEvent): void
    {
        // console.log('UpdatedUserEvent: ', event);
    }
}