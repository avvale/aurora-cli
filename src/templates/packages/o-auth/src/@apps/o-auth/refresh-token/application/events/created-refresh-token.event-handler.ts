import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { CreatedRefreshTokenEvent } from './created-refresh-token.event';

@EventsHandler(CreatedRefreshTokenEvent)
export class CreatedRefreshTokenEventHandler implements IEventHandler<CreatedRefreshTokenEvent>
{
    handle(event: CreatedRefreshTokenEvent)
    {
        // console.log('CreatedRefreshTokenEvent: ', event);
    }
}