import { AuditingCreatedSideEffectEvent } from '@app/auditing/side-effect';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

@EventsHandler(AuditingCreatedSideEffectEvent)
export class AuditingCreatedSideEffectEventHandler
  implements IEventHandler<AuditingCreatedSideEffectEvent>
{
  handle(event: AuditingCreatedSideEffectEvent): void {
    // console.log('AuditingCreatedSideEffectEvent: ', event);
  }
}
