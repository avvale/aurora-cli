import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { QueueManagerUpdatedJobRegistryEvent } from './queue-manager-updated-job-registry.event';

@EventsHandler(QueueManagerUpdatedJobRegistryEvent)
export class QueueManagerUpdatedJobRegistryEventHandler implements IEventHandler<QueueManagerUpdatedJobRegistryEvent>
{
    handle(event: QueueManagerUpdatedJobRegistryEvent): void
    {
        // console.log('UpdatedJobRegistryEvent: ', event);
    }
}
