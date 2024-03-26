import { AuditingUpdatedAndIncrementedHttpCommunicationsEvent } from '@app/auditing/http-communication';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

@EventsHandler(AuditingUpdatedAndIncrementedHttpCommunicationsEvent)
export class AuditingUpdatedAndIncrementedHttpCommunicationsEventHandler implements IEventHandler<AuditingUpdatedAndIncrementedHttpCommunicationsEvent>
{
    handle(event: AuditingUpdatedAndIncrementedHttpCommunicationsEvent): void
    {
        // console.log('AuditingUpdatedAndIncrementedHttpCommunicationsEvent: ', event);
    }
}
