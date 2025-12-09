import { SupportCreatedIssueEvent } from '@app/support/issue';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

@EventsHandler(SupportCreatedIssueEvent)
export class SupportCreatedIssueEventHandler
    implements IEventHandler<SupportCreatedIssueEvent>
{
    handle(event: SupportCreatedIssueEvent): void {
        // console.log('SupportCreatedIssueEvent: ', event);
    }
}
