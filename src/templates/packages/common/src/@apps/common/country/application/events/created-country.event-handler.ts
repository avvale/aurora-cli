import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { CreatedCountryEvent } from './created-country.event';

@EventsHandler(CreatedCountryEvent)
export class CreatedCountryEventHandler implements IEventHandler<CreatedCountryEvent>
{
    handle(event: CreatedCountryEvent)
    {
        // console.log('CreatedCountryEvent: ', event);
    }
}