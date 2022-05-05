import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { CreatedRoleEvent } from './created-role.event';

@EventsHandler(CreatedRoleEvent)
export class CreatedRoleEventHandler implements IEventHandler<CreatedRoleEvent>
{
    handle(event: CreatedRoleEvent): void
    {
        // console.log('CreatedRoleEvent: ', event);
    }
}