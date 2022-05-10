import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { UpdatedRefreshTokensEvent } from './updated-refresh-tokens.event';

@EventsHandler(UpdatedRefreshTokensEvent)
export class UpdatedRefreshTokensEventHandler implements IEventHandler<UpdatedRefreshTokensEvent>
{
    handle(event: UpdatedRefreshTokensEvent): void
    {
        // console.log('UpdatedRefreshTokensEvent: ', event);
    }
}