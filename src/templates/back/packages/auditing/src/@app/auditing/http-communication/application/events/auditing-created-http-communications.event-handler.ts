import { AuditingCreatedHttpCommunicationsEvent } from '@app/auditing/http-communication';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

@EventsHandler(AuditingCreatedHttpCommunicationsEvent)
export class AuditingCreatedHttpCommunicationsEventHandler
  implements IEventHandler<AuditingCreatedHttpCommunicationsEvent>
{
  handle(event: AuditingCreatedHttpCommunicationsEvent): void {
    // console.log('CreatedHttpCommunicationsEvent: ', event);
  }
}
