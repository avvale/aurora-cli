import { QueueManagerUpdatedJobRegistryEvent } from '@app/queue-manager/job-registry';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

@EventsHandler(QueueManagerUpdatedJobRegistryEvent)
export class QueueManagerUpdatedJobRegistryEventHandler
    implements IEventHandler<QueueManagerUpdatedJobRegistryEvent>
{
    handle(event: QueueManagerUpdatedJobRegistryEvent): void {
        // console.log('UpdatedJobRegistryEvent: ', event);
    }
}
