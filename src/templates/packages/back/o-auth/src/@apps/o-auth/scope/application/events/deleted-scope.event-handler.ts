import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { DeletedScopeEvent } from './deleted-scope.event';

@EventsHandler(DeletedScopeEvent)
export class DeletedScopeEventHandler implements IEventHandler<DeletedScopeEvent>
{
    handle(event: DeletedScopeEvent): void
    {
        // console.log('DeletedScopeEvent: ', event);
    }
}