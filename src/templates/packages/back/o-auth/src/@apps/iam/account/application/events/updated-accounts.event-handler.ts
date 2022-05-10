import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { UpdatedAccountsEvent } from './updated-accounts.event';

@EventsHandler(UpdatedAccountsEvent)
export class UpdatedAccountsEventHandler implements IEventHandler<UpdatedAccountsEvent>
{
    handle(event: UpdatedAccountsEvent): void
    {
        // console.log('UpdatedAccountsEvent: ', event);
    }
}