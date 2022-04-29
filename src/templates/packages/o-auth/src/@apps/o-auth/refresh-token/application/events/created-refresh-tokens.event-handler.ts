import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { CreatedRefreshTokensEvent } from './created-refresh-tokens.event';

@EventsHandler(CreatedRefreshTokensEvent)
export class CreatedRefreshTokensEventHandler implements IEventHandler<CreatedRefreshTokensEvent>
{
    handle(event: CreatedRefreshTokensEvent): void
    {
        // console.log('CreatedRefreshTokensEvent: ', event);
    }
}