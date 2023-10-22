import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { AuditingDeletedHttpCommunicationEvent } from './auditing-deleted-http-communication.event';

@EventsHandler(AuditingDeletedHttpCommunicationEvent)
export class AuditingDeletedHttpCommunicationEventHandler implements IEventHandler<AuditingDeletedHttpCommunicationEvent>
{
    handle(event: AuditingDeletedHttpCommunicationEvent): void
    {
        // console.log('AuditingDeletedHttpCommunicationEvent: ', event);
    }
}
