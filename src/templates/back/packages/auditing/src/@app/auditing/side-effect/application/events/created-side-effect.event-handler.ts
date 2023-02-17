import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { CreatedSideEffectEvent } from './created-side-effect.event';

@EventsHandler(CreatedSideEffectEvent)
export class CreatedSideEffectEventHandler implements IEventHandler<CreatedSideEffectEvent>
{
    handle(event: CreatedSideEffectEvent): void
    {
        // console.log('CreatedSideEffectEvent: ', event);
    }
}