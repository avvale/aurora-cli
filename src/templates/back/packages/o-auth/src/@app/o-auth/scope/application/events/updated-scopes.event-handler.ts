import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { UpdatedScopesEvent } from './updated-scopes.event';

@EventsHandler(UpdatedScopesEvent)
export class UpdatedScopesEventHandler implements IEventHandler<UpdatedScopesEvent>
{
    handle(event: UpdatedScopesEvent): void
    {
        // console.log('UpdatedScopesEvent: ', event);
    }
}