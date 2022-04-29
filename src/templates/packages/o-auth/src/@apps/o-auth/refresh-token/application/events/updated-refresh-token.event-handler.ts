import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { UpdatedRefreshTokenEvent } from './updated-refresh-token.event';

@EventsHandler(UpdatedRefreshTokenEvent)
export class UpdatedRefreshTokenEventHandler implements IEventHandler<UpdatedRefreshTokenEvent>
{
    handle(event: UpdatedRefreshTokenEvent): void
    {
        // console.log('UpdatedRefreshTokenEvent: ', event);
    }
}