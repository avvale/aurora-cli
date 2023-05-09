import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { DeletedJobsRegistryEvent } from './deleted-jobs-registry.event';

@EventsHandler(DeletedJobsRegistryEvent)
export class DeletedJobsRegistryEventHandler implements IEventHandler<DeletedJobsRegistryEvent>
{
    handle(event: DeletedJobsRegistryEvent): void
    {
        // console.log('DeletedJobsRegistryEvent: ', event);
    }
}