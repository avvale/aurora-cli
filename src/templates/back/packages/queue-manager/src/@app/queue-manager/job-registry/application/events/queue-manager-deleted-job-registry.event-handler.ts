import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { QueueManagerDeletedJobRegistryEvent } from './queue-manager-deleted-job-registry.event';

@EventsHandler(QueueManagerDeletedJobRegistryEvent)
export class QueueManagerDeletedJobRegistryEventHandler implements IEventHandler<QueueManagerDeletedJobRegistryEvent>
{
    handle(event: QueueManagerDeletedJobRegistryEvent): void
    {
        // console.log('QueueManagerDeletedJobRegistryEvent: ', event);
    }
}
