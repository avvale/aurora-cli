import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { AuditingCreatedSideEffectsEvent } from './auditing-created-side-effects.event';

@EventsHandler(AuditingCreatedSideEffectsEvent)
export class AuditingCreatedSideEffectsEventHandler implements IEventHandler<AuditingCreatedSideEffectsEvent>
{
    handle(event: AuditingCreatedSideEffectsEvent): void
    {
        // console.log('CreatedSideEffectsEvent: ', event);
    }
}
