import { QueueManagerUpdatedAndIncrementedJobsRegistryEvent } from '@app/queue-manager/job-registry';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

@EventsHandler(QueueManagerUpdatedAndIncrementedJobsRegistryEvent)
export class QueueManagerUpdatedAndIncrementedJobsRegistryEventHandler implements IEventHandler<QueueManagerUpdatedAndIncrementedJobsRegistryEvent>
{
    handle(event: QueueManagerUpdatedAndIncrementedJobsRegistryEvent): void
    {
        // console.log('QueueManagerUpdatedAndIncrementedJobsRegistryEvent: ', event);
    }
}
