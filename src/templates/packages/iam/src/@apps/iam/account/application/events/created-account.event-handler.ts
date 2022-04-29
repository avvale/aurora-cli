import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { CreatedAccountEvent } from './created-account.event';

@EventsHandler(CreatedAccountEvent)
export class CreatedAccountEventHandler implements IEventHandler<CreatedAccountEvent>
{
    handle(event: CreatedAccountEvent)
    {
        // console.log('CreatedAccountEvent: ', event);
    }
}