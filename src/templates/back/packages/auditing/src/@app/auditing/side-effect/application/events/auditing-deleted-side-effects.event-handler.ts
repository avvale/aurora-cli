import { AuditingDeletedSideEffectsEvent } from '@app/auditing/side-effect';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

@EventsHandler(AuditingDeletedSideEffectsEvent)
export class AuditingDeletedSideEffectsEventHandler implements IEventHandler<AuditingDeletedSideEffectsEvent>
{
    handle(event: AuditingDeletedSideEffectsEvent): void
    {
        // console.log('DeletedSideEffectsEvent: ', event);
    }
}
