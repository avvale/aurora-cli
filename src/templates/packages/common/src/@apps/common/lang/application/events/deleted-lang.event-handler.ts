import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { DeletedLangEvent } from './deleted-lang.event';

@EventsHandler(DeletedLangEvent)
export class DeletedLangEventHandler implements IEventHandler<DeletedLangEvent>
{
    handle(event: DeletedLangEvent)
    {
        // console.log('DeletedLangEvent: ', event);
    }
}