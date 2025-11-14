import { AuditingUpdatedSideEffectsEvent } from '@app/auditing/side-effect';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

@EventsHandler(AuditingUpdatedSideEffectsEvent)
export class AuditingUpdatedSideEffectsEventHandler
    implements IEventHandler<AuditingUpdatedSideEffectsEvent>
{
    handle(event: AuditingUpdatedSideEffectsEvent): void {
        // console.log('AuditingUpdatedSideEffectsEvent: ', event);
    }
}
