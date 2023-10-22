import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { AuditingDeletedSideEffectsEvent } from './auditing-deleted-side-effects.event';

@EventsHandler(AuditingDeletedSideEffectsEvent)
export class AuditingDeletedSideEffectsEventHandler implements IEventHandler<AuditingDeletedSideEffectsEvent>
{
    handle(event: AuditingDeletedSideEffectsEvent): void
    {
        // console.log('DeletedSideEffectsEvent: ', event);
    }
}
