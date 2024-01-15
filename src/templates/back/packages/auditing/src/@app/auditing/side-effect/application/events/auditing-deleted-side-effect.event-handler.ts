import { AuditingDeletedSideEffectEvent } from '@app/auditing/side-effect';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

@EventsHandler(AuditingDeletedSideEffectEvent)
export class AuditingDeletedSideEffectEventHandler implements IEventHandler<AuditingDeletedSideEffectEvent>
{
    handle(event: AuditingDeletedSideEffectEvent): void
    {
        // console.log('AuditingDeletedSideEffectEvent: ', event);
    }
}
