import { SupportUpdatedIssuesEvent } from '@app/support/issue';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

@EventsHandler(SupportUpdatedIssuesEvent)
export class SupportUpdatedIssuesEventHandler
    implements IEventHandler<SupportUpdatedIssuesEvent>
{
    handle(event: SupportUpdatedIssuesEvent): void {
        // 'SupportUpdatedIssuesEvent'
    }
}
