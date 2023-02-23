import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { CreatedScopeEvent } from './created-scope.event';

@EventsHandler(CreatedScopeEvent)
export class CreatedScopeEventHandler implements IEventHandler<CreatedScopeEvent>
{
    handle(event: CreatedScopeEvent): void
    {
        // console.log('CreatedScopeEvent: ', event);
    }
}