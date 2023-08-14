import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { QueueManagerDeletedJobsRegistryEvent } from './queue-manager-deleted-jobs-registry.event';

@EventsHandler(QueueManagerDeletedJobsRegistryEvent)
export class QueueManagerDeletedJobsRegistryEventHandler implements IEventHandler<QueueManagerDeletedJobsRegistryEvent>
{
    handle(event: QueueManagerDeletedJobsRegistryEvent): void
    {
        // console.log('DeletedJobsRegistryEvent: ', event);
    }
}
