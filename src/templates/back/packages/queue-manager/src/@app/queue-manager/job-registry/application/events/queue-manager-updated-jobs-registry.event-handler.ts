import { QueueManagerUpdatedJobsRegistryEvent } from '@app/queue-manager/job-registry';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

@EventsHandler(QueueManagerUpdatedJobsRegistryEvent)
export class QueueManagerUpdatedJobsRegistryEventHandler implements IEventHandler<QueueManagerUpdatedJobsRegistryEvent>
{
    handle(event: QueueManagerUpdatedJobsRegistryEvent): void
    {
        // console.log('QueueManagerUpdatedJobsRegistryEvent: ', event);
    }
}
