import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { AuditingDeletedHttpCommunicationsEvent } from './auditing-deleted-http-communications.event';

@EventsHandler(AuditingDeletedHttpCommunicationsEvent)
export class AuditingDeletedHttpCommunicationsEventHandler implements IEventHandler<AuditingDeletedHttpCommunicationsEvent>
{
    handle(event: AuditingDeletedHttpCommunicationsEvent): void
    {
        // console.log('DeletedHttpCommunicationsEvent: ', event);
    }
}
