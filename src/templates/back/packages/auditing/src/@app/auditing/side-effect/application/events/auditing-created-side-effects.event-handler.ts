import { AuditingCreatedSideEffectsEvent } from '@app/auditing/side-effect';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

@EventsHandler(AuditingCreatedSideEffectsEvent)
export class AuditingCreatedSideEffectsEventHandler
    implements IEventHandler<AuditingCreatedSideEffectsEvent>
{
    handle(event: AuditingCreatedSideEffectsEvent): void {
        // console.log('CreatedSideEffectsEvent: ', event);
    }
}
