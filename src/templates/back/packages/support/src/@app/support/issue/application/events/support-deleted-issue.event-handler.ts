import { SupportDeletedIssueEvent } from '@app/support/issue';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

@EventsHandler(SupportDeletedIssueEvent)
export class SupportDeletedIssueEventHandler
    implements IEventHandler<SupportDeletedIssueEvent>
{
    handle(event: SupportDeletedIssueEvent): void {
        // console.log('SupportDeletedIssueEvent: ', event);
    }
}
