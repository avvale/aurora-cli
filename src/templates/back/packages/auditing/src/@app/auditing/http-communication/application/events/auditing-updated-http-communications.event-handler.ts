import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { AuditingUpdatedHttpCommunicationsEvent } from './auditing-updated-http-communications.event';

@EventsHandler(AuditingUpdatedHttpCommunicationsEvent)
export class AuditingUpdatedHttpCommunicationsEventHandler implements IEventHandler<AuditingUpdatedHttpCommunicationsEvent>
{
    handle(event: AuditingUpdatedHttpCommunicationsEvent): void
    {
        // console.log('AuditingUpdatedHttpCommunicationsEvent: ', event);
    }
}
