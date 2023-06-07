import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { UpdatedCountryEvent } from './updated-country.event';

@EventsHandler(UpdatedCountryEvent)
export class UpdatedCountryEventHandler implements IEventHandler<UpdatedCountryEvent>
{
    handle(event: UpdatedCountryEvent): void
    {
        // console.log('UpdatedCountryEvent: ', event);
    }
}