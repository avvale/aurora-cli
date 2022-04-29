import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { CreatedApplicationEvent } from './created-application.event';

@EventsHandler(CreatedApplicationEvent)
export class CreatedApplicationEventHandler implements IEventHandler<CreatedApplicationEvent>
{
    handle(event: CreatedApplicationEvent): void
    {
        // console.log('CreatedApplicationEvent: ', event);
    }
}