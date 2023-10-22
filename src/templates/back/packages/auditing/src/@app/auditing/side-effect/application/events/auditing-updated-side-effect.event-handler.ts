import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { AuditingUpdatedSideEffectEvent } from './auditing-updated-side-effect.event';

@EventsHandler(AuditingUpdatedSideEffectEvent)
export class AuditingUpdatedSideEffectEventHandler implements IEventHandler<AuditingUpdatedSideEffectEvent>
{
    handle(event: AuditingUpdatedSideEffectEvent): void
    {
        // console.log('UpdatedSideEffectEvent: ', event);
    }
}
