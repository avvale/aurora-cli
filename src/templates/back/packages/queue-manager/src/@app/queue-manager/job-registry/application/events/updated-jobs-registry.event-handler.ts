import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { UpdatedJobsRegistryEvent } from './updated-jobs-registry.event';

@EventsHandler(UpdatedJobsRegistryEvent)
export class UpdatedJobsRegistryEventHandler implements IEventHandler<UpdatedJobsRegistryEvent>
{
    handle(event: UpdatedJobsRegistryEvent): void
    {
        // console.log('UpdatedJobsRegistryEvent: ', event);
    }
}