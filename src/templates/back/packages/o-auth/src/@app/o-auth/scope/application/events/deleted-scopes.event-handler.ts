import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { DeletedScopesEvent } from './deleted-scopes.event';

@EventsHandler(DeletedScopesEvent)
export class DeletedScopesEventHandler implements IEventHandler<DeletedScopesEvent>
{
    handle(event: DeletedScopesEvent): void
    {
        // console.log('DeletedScopesEvent: ', event);
    }
}