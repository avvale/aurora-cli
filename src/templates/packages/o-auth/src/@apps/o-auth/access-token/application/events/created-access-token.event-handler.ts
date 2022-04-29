import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { CreatedAccessTokenEvent } from './created-access-token.event';

@EventsHandler(CreatedAccessTokenEvent)
export class CreatedAccessTokenEventHandler implements IEventHandler<CreatedAccessTokenEvent>
{
    handle(event: CreatedAccessTokenEvent): void
    {
        // console.log('CreatedAccessTokenEvent: ', event);
    }
}