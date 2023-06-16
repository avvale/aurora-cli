import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { CommonUpdatedCountriesEvent } from './common-updated-countries.event';

@EventsHandler(CommonUpdatedCountriesEvent)
export class CommonUpdatedCountriesEventHandler implements IEventHandler<CommonUpdatedCountriesEvent>
{
    handle(event: CommonUpdatedCountriesEvent): void
    {
        // console.log('CommonUpdatedCountriesEvent: ', event);
    }
}