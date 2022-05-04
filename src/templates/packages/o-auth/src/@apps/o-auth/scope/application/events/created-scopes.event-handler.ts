import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { CreatedScopesEvent } from './created-scopes.event';

@EventsHandler(CreatedScopesEvent)
export class CreatedScopesEventHandler implements IEventHandler<CreatedScopesEvent>
{
    handle(event: CreatedScopesEvent): void
    {
        // console.log('CreatedScopesEvent: ', event);
    }
}