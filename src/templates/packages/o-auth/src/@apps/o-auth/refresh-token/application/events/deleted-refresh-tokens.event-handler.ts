import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { DeletedRefreshTokensEvent } from './deleted-refresh-tokens.event';

@EventsHandler(DeletedRefreshTokensEvent)
export class DeletedRefreshTokensEventHandler implements IEventHandler<DeletedRefreshTokensEvent>
{
    handle(event: DeletedRefreshTokensEvent): void
    {
        // console.log('DeletedRefreshTokensEvent: ', event);
    }
}