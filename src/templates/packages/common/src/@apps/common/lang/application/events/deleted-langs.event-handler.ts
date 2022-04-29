import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { DeletedLangsEvent } from './deleted-langs.event';

@EventsHandler(DeletedLangsEvent)
export class DeletedLangsEventHandler implements IEventHandler<DeletedLangsEvent>
{
    handle(event: DeletedLangsEvent)
    {
        // console.log('DeletedLangsEvent: ', event);
    }
}