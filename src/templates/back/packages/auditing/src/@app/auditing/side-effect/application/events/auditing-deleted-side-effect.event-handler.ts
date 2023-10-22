import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { AuditingDeletedSideEffectEvent } from './auditing-deleted-side-effect.event';

@EventsHandler(AuditingDeletedSideEffectEvent)
export class AuditingDeletedSideEffectEventHandler implements IEventHandler<AuditingDeletedSideEffectEvent>
{
    handle(event: AuditingDeletedSideEffectEvent): void
    {
        // console.log('AuditingDeletedSideEffectEvent: ', event);
    }
}
