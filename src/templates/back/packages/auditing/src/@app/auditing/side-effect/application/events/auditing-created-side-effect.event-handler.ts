import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { AuditingCreatedSideEffectEvent } from './auditing-created-side-effect.event';

@EventsHandler(AuditingCreatedSideEffectEvent)
export class AuditingCreatedSideEffectEventHandler implements IEventHandler<AuditingCreatedSideEffectEvent>
{
    handle(event: AuditingCreatedSideEffectEvent): void
    {
        // console.log('AuditingCreatedSideEffectEvent: ', event);
    }
}
