import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { CreatedAccountsEvent } from './created-accounts.event';

@EventsHandler(CreatedAccountsEvent)
export class CreatedAccountsEventHandler implements IEventHandler<CreatedAccountsEvent>
{
    handle(event: CreatedAccountsEvent)
    {
        // console.log('CreatedAccountsEvent: ', event);
    }
}