import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { UpdatedSideEffectEvent } from './updated-side-effect.event';

@EventsHandler(UpdatedSideEffectEvent)
export class UpdatedSideEffectEventHandler implements IEventHandler<UpdatedSideEffectEvent>
{
    handle(event: UpdatedSideEffectEvent): void
    {
        // console.log('UpdatedSideEffectEvent: ', event);
    }
}