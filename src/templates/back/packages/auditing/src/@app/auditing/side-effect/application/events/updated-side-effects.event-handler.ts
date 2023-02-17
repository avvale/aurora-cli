import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { UpdatedSideEffectsEvent } from './updated-side-effects.event';

@EventsHandler(UpdatedSideEffectsEvent)
export class UpdatedSideEffectsEventHandler implements IEventHandler<UpdatedSideEffectsEvent>
{
    handle(event: UpdatedSideEffectsEvent): void
    {
        // console.log('UpdatedSideEffectsEvent: ', event);
    }
}