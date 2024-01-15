import { AuditingUpdatedHttpCommunicationsEvent } from '@app/auditing/http-communication';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

@EventsHandler(AuditingUpdatedHttpCommunicationsEvent)
export class AuditingUpdatedHttpCommunicationsEventHandler implements IEventHandler<AuditingUpdatedHttpCommunicationsEvent>
{
    handle(event: AuditingUpdatedHttpCommunicationsEvent): void
    {
        // console.log('AuditingUpdatedHttpCommunicationsEvent: ', event);
    }
}
