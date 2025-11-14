import { AuditingCreatedHttpCommunicationEvent } from '@app/auditing/http-communication';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

@EventsHandler(AuditingCreatedHttpCommunicationEvent)
export class AuditingCreatedHttpCommunicationEventHandler
    implements IEventHandler<AuditingCreatedHttpCommunicationEvent>
{
    handle(event: AuditingCreatedHttpCommunicationEvent): void {
        // console.log('AuditingCreatedHttpCommunicationEvent: ', event);
    }
}
