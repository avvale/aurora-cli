import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { CreatedAccessTokensEvent } from './created-access-tokens.event';

@EventsHandler(CreatedAccessTokensEvent)
export class CreatedAccessTokensEventHandler implements IEventHandler<CreatedAccessTokensEvent>
{
    handle(event: CreatedAccessTokensEvent): void
    {
        // console.log('CreatedAccessTokensEvent: ', event);
    }
}