import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { QueueManagerUpdatedJobsRegistryEvent } from './queue-manager-updated-jobs-registry.event';

@EventsHandler(QueueManagerUpdatedJobsRegistryEvent)
export class QueueManagerUpdatedJobsRegistryEventHandler implements IEventHandler<QueueManagerUpdatedJobsRegistryEvent>
{
    handle(event: QueueManagerUpdatedJobsRegistryEvent): void
    {
        // console.log('QueueManagerUpdatedJobsRegistryEvent: ', event);
    }
}
