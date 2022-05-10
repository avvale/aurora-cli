import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { UpdatedAccessTokensEvent } from './updated-access-tokens.event';

@EventsHandler(UpdatedAccessTokensEvent)
export class UpdatedAccessTokensEventHandler implements IEventHandler<UpdatedAccessTokensEvent>
{
    handle(event: UpdatedAccessTokensEvent): void
    {
        // console.log('UpdatedAccessTokensEvent: ', event);
    }
}