import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { UpdatedLangsEvent } from './updated-langs.event';

@EventsHandler(UpdatedLangsEvent)
export class UpdatedLangsEventHandler implements IEventHandler<UpdatedLangsEvent>
{
    handle(event: UpdatedLangsEvent): void
    {
        // console.log('UpdatedLangsEvent: ', event);
    }
}