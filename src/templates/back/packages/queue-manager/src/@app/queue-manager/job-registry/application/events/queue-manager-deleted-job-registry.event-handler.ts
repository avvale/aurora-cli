import { QueueManagerDeletedJobRegistryEvent } from '@app/queue-manager/job-registry';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

@EventsHandler(QueueManagerDeletedJobRegistryEvent)
export class QueueManagerDeletedJobRegistryEventHandler
    implements IEventHandler<QueueManagerDeletedJobRegistryEvent>
{
    handle(event: QueueManagerDeletedJobRegistryEvent): void {
        // console.log('QueueManagerDeletedJobRegistryEvent: ', event);
    }
}
