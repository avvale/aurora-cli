import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { UpdatedLangEvent } from './updated-lang.event';

@EventsHandler(UpdatedLangEvent)
export class UpdatedLangEventHandler implements IEventHandler<UpdatedLangEvent>
{
    handle(event: UpdatedLangEvent): void
    {
        // console.log('UpdatedLangEvent: ', event);
    }
}