import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { AuditingUpdatedHttpCommunicationEvent } from './auditing-updated-http-communication.event';

@EventsHandler(AuditingUpdatedHttpCommunicationEvent)
export class AuditingUpdatedHttpCommunicationEventHandler implements IEventHandler<AuditingUpdatedHttpCommunicationEvent>
{
    handle(event: AuditingUpdatedHttpCommunicationEvent): void
    {
        // console.log('UpdatedHttpCommunicationEvent: ', event);
    }
}
