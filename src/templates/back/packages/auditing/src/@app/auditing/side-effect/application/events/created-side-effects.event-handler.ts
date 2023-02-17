import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { CreatedSideEffectsEvent } from './created-side-effects.event';

@EventsHandler(CreatedSideEffectsEvent)
export class CreatedSideEffectsEventHandler implements IEventHandler<CreatedSideEffectsEvent>
{
    handle(event: CreatedSideEffectsEvent): void
    {
        // console.log('CreatedSideEffectsEvent: ', event);
    }
}