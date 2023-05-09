import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { CreatedJobRegistryEvent } from './created-job-registry.event';

@EventsHandler(CreatedJobRegistryEvent)
export class CreatedJobRegistryEventHandler implements IEventHandler<CreatedJobRegistryEvent>
{
    handle(event: CreatedJobRegistryEvent): void
    {
        // console.log('CreatedJobRegistryEvent: ', event);
    }
}