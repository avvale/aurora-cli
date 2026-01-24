import { QueueManagerDeletedJobsRegistryEvent } from '@app/queue-manager/job-registry';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

@EventsHandler(QueueManagerDeletedJobsRegistryEvent)
export class QueueManagerDeletedJobsRegistryEventHandler
  implements IEventHandler<QueueManagerDeletedJobsRegistryEvent>
{
  handle(event: QueueManagerDeletedJobsRegistryEvent): void {
    // console.log('DeletedJobsRegistryEvent: ', event);
  }
}
