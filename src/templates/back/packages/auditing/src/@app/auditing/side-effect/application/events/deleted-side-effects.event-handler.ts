import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { DeletedSideEffectsEvent } from './deleted-side-effects.event';

@EventsHandler(DeletedSideEffectsEvent)
export class DeletedSideEffectsEventHandler implements IEventHandler<DeletedSideEffectsEvent>
{
    handle(event: DeletedSideEffectsEvent): void
    {
        // console.log('DeletedSideEffectsEvent: ', event);
    }
}