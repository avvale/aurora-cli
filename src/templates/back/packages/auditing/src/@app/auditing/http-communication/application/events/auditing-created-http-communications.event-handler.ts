import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { AuditingCreatedHttpCommunicationsEvent } from './auditing-created-http-communications.event';

@EventsHandler(AuditingCreatedHttpCommunicationsEvent)
export class AuditingCreatedHttpCommunicationsEventHandler implements IEventHandler<AuditingCreatedHttpCommunicationsEvent>
{
    handle(event: AuditingCreatedHttpCommunicationsEvent): void
    {
        // console.log('CreatedHttpCommunicationsEvent: ', event);
    }
}
