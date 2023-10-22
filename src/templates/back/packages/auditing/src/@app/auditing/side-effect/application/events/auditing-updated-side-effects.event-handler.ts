import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { AuditingUpdatedSideEffectsEvent } from './auditing-updated-side-effects.event';

@EventsHandler(AuditingUpdatedSideEffectsEvent)
export class AuditingUpdatedSideEffectsEventHandler implements IEventHandler<AuditingUpdatedSideEffectsEvent>
{
    handle(event: AuditingUpdatedSideEffectsEvent): void
    {
        // console.log('AuditingUpdatedSideEffectsEvent: ', event);
    }
}
