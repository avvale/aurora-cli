import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { AuditingCreatedHttpCommunicationEvent } from './auditing-created-http-communication.event';

@EventsHandler(AuditingCreatedHttpCommunicationEvent)
export class AuditingCreatedHttpCommunicationEventHandler implements IEventHandler<AuditingCreatedHttpCommunicationEvent>
{
    handle(event: AuditingCreatedHttpCommunicationEvent): void
    {
        // console.log('AuditingCreatedHttpCommunicationEvent: ', event);
    }
}
