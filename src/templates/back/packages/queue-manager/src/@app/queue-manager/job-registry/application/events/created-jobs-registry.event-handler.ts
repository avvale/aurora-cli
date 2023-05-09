import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { CreatedJobsRegistryEvent } from './created-jobs-registry.event';

@EventsHandler(CreatedJobsRegistryEvent)
export class CreatedJobsRegistryEventHandler implements IEventHandler<CreatedJobsRegistryEvent>
{
    handle(event: CreatedJobsRegistryEvent): void
    {
        // console.log('CreatedJobsRegistryEvent: ', event);
    }
}