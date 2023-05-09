import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { DeletedJobRegistryEvent } from './deleted-job-registry.event';

@EventsHandler(DeletedJobRegistryEvent)
export class DeletedJobRegistryEventHandler implements IEventHandler<DeletedJobRegistryEvent>
{
    handle(event: DeletedJobRegistryEvent): void
    {
        // console.log('DeletedJobRegistryEvent: ', event);
    }
}