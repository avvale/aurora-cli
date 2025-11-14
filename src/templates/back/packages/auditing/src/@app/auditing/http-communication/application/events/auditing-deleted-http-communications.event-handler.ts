import { AuditingDeletedHttpCommunicationsEvent } from '@app/auditing/http-communication';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

@EventsHandler(AuditingDeletedHttpCommunicationsEvent)
export class AuditingDeletedHttpCommunicationsEventHandler
    implements IEventHandler<AuditingDeletedHttpCommunicationsEvent>
{
    handle(event: AuditingDeletedHttpCommunicationsEvent): void {
        // console.log('DeletedHttpCommunicationsEvent: ', event);
    }
}
