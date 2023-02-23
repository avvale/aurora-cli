import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { UpdatedCountriesEvent } from './updated-countries.event';

@EventsHandler(UpdatedCountriesEvent)
export class UpdatedCountriesEventHandler implements IEventHandler<UpdatedCountriesEvent>
{
    handle(event: UpdatedCountriesEvent): void
    {
        // console.log('UpdatedCountriesEvent: ', event);
    }
}