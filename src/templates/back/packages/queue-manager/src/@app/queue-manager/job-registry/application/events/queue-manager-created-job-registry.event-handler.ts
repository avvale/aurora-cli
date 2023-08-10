import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { QueueManagerCreatedJobRegistryEvent } from './queue-manager-created-job-registry.event';

@EventsHandler(QueueManagerCreatedJobRegistryEvent)
export class QueueManagerCreatedJobRegistryEventHandler implements IEventHandler<QueueManagerCreatedJobRegistryEvent>
{
    handle(event: QueueManagerCreatedJobRegistryEvent): void
    {
        // console.log('QueueManagerCreatedJobRegistryEvent: ', event);
    }
}
