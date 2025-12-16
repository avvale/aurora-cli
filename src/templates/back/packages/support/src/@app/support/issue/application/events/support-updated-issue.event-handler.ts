import { SupportUpdatedIssueEvent } from '@app/support/issue';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

@EventsHandler(SupportUpdatedIssueEvent)
export class SupportUpdatedIssueEventHandler
    implements IEventHandler<SupportUpdatedIssueEvent>
{
    handle(event: SupportUpdatedIssueEvent): void {
        // 'UpdatedIssueEvent'
    }
}
