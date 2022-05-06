import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { UpdatedScopeEvent } from './updated-scope.event';

@EventsHandler(UpdatedScopeEvent)
export class UpdatedScopeEventHandler implements IEventHandler<UpdatedScopeEvent>
{
    handle(event: UpdatedScopeEvent): void
    {
        // console.log('UpdatedScopeEvent: ', event);
    }
}