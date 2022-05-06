import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { CreatedAccountsEvent } from './created-accounts.event';

@EventsHandler(CreatedAccountsEvent)
export class CreatedAccountsEventHandler implements IEventHandler<CreatedAccountsEvent>
{
    handle(event: CreatedAccountsEvent): void
    {
        // console.log('CreatedAccountsEvent: ', event);
    }
}