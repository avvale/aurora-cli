import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { CreatedLangsEvent } from './created-langs.event';

@EventsHandler(CreatedLangsEvent)
export class CreatedLangsEventHandler implements IEventHandler<CreatedLangsEvent>
{
    handle(event: CreatedLangsEvent): void
    {
        // console.log('CreatedLangsEvent: ', event);
    }
}