import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { DeletedAccountsEvent } from './deleted-accounts.event';

@EventsHandler(DeletedAccountsEvent)
export class DeletedAccountsEventHandler implements IEventHandler<DeletedAccountsEvent>
{
    handle(event: DeletedAccountsEvent)
    {
        // console.log('DeletedAccountsEvent: ', event);
    }
}