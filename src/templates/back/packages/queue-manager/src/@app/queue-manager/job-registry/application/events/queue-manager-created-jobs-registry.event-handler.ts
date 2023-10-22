import { QueueManagerCreatedJobsRegistryEvent } from '@app/queue-manager/job-registry';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

@EventsHandler(QueueManagerCreatedJobsRegistryEvent)
export class QueueManagerCreatedJobsRegistryEventHandler implements IEventHandler<QueueManagerCreatedJobsRegistryEvent>
{
    handle(event: QueueManagerCreatedJobsRegistryEvent): void
    {
        // console.log('CreatedJobsRegistryEvent: ', event);
    }
}
