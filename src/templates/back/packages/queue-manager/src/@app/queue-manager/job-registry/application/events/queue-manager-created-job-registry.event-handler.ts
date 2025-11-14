import { QueueManagerCreatedJobRegistryEvent } from '@app/queue-manager/job-registry';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

@EventsHandler(QueueManagerCreatedJobRegistryEvent)
export class QueueManagerCreatedJobRegistryEventHandler
    implements IEventHandler<QueueManagerCreatedJobRegistryEvent>
{
    handle(event: QueueManagerCreatedJobRegistryEvent): void {
        // console.log('QueueManagerCreatedJobRegistryEvent: ', event);
    }
}
