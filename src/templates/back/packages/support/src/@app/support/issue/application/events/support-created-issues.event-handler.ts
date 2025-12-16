import { SupportCreatedIssuesEvent } from '@app/support/issue';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

@EventsHandler(SupportCreatedIssuesEvent)
export class SupportCreatedIssuesEventHandler
    implements IEventHandler<SupportCreatedIssuesEvent>
{
    handle(event: SupportCreatedIssuesEvent): void {
        // 'CreatedIssuesEvent';
    }
}
