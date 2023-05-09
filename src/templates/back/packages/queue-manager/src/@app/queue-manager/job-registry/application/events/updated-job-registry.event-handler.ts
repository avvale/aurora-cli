import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { UpdatedJobRegistryEvent } from './updated-job-registry.event';

@EventsHandler(UpdatedJobRegistryEvent)
export class UpdatedJobRegistryEventHandler implements IEventHandler<UpdatedJobRegistryEvent>
{
    handle(event: UpdatedJobRegistryEvent): void
    {
        // console.log('UpdatedJobRegistryEvent: ', event);
    }
}