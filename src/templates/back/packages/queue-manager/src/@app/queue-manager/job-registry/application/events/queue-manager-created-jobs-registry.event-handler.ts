import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { QueueManagerCreatedJobsRegistryEvent } from './queue-manager-created-jobs-registry.event';

@EventsHandler(QueueManagerCreatedJobsRegistryEvent)
export class QueueManagerCreatedJobsRegistryEventHandler implements IEventHandler<QueueManagerCreatedJobsRegistryEvent>
{
    handle(event: QueueManagerCreatedJobsRegistryEvent): void
    {
        // console.log('CreatedJobsRegistryEvent: ', event);
    }
}
