import { AuditingUpdatedSideEffectEvent } from '@app/auditing/side-effect';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

@EventsHandler(AuditingUpdatedSideEffectEvent)
export class AuditingUpdatedSideEffectEventHandler
    implements IEventHandler<AuditingUpdatedSideEffectEvent>
{
    handle(event: AuditingUpdatedSideEffectEvent): void {
        // console.log('UpdatedSideEffectEvent: ', event);
    }
}
