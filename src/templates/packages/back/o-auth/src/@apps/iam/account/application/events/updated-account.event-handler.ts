import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { UpdatedAccountEvent } from './updated-account.event';

@EventsHandler(UpdatedAccountEvent)
export class UpdatedAccountEventHandler implements IEventHandler<UpdatedAccountEvent>
{
    handle(event: UpdatedAccountEvent): void
    {
        // console.log('UpdatedAccountEvent: ', event);
    }
}