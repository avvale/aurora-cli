import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { DeletedSideEffectEvent } from './deleted-side-effect.event';

@EventsHandler(DeletedSideEffectEvent)
export class DeletedSideEffectEventHandler implements IEventHandler<DeletedSideEffectEvent>
{
    handle(event: DeletedSideEffectEvent): void
    {
        // console.log('DeletedSideEffectEvent: ', event);
    }
}