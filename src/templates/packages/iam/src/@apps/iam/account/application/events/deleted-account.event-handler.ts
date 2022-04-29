import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { DeletedAccountEvent } from './deleted-account.event';

@EventsHandler(DeletedAccountEvent)
export class DeletedAccountEventHandler implements IEventHandler<DeletedAccountEvent>
{
    handle(event: DeletedAccountEvent)
    {
        // console.log('DeletedAccountEvent: ', event);
    }
}