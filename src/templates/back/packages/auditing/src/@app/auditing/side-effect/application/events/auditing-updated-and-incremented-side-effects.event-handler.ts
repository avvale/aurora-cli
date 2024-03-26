import { AuditingUpdatedAndIncrementedSideEffectsEvent } from '@app/auditing/side-effect';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

@EventsHandler(AuditingUpdatedAndIncrementedSideEffectsEvent)
export class AuditingUpdatedAndIncrementedSideEffectsEventHandler implements IEventHandler<AuditingUpdatedAndIncrementedSideEffectsEvent>
{
    handle(event: AuditingUpdatedAndIncrementedSideEffectsEvent): void
    {
        // console.log('AuditingUpdatedAndIncrementedSideEffectsEvent: ', event);
    }
}
