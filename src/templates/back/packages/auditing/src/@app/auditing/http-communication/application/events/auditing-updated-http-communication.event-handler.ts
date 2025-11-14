import { AuditingUpdatedHttpCommunicationEvent } from '@app/auditing/http-communication';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

@EventsHandler(AuditingUpdatedHttpCommunicationEvent)
export class AuditingUpdatedHttpCommunicationEventHandler
    implements IEventHandler<AuditingUpdatedHttpCommunicationEvent>
{
    handle(event: AuditingUpdatedHttpCommunicationEvent): void {
        // console.log('UpdatedHttpCommunicationEvent: ', event);
    }
}
