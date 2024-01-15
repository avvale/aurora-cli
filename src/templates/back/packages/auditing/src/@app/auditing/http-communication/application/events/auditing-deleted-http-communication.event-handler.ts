import { AuditingDeletedHttpCommunicationEvent } from '@app/auditing/http-communication';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

@EventsHandler(AuditingDeletedHttpCommunicationEvent)
export class AuditingDeletedHttpCommunicationEventHandler implements IEventHandler<AuditingDeletedHttpCommunicationEvent>
{
    handle(event: AuditingDeletedHttpCommunicationEvent): void
    {
        // console.log('AuditingDeletedHttpCommunicationEvent: ', event);
    }
}
