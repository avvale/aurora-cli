import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { CommonUpdatedCountryEvent } from './common-updated-country.event';

@EventsHandler(CommonUpdatedCountryEvent)
export class CommonUpdatedCountryEventHandler implements IEventHandler<CommonUpdatedCountryEvent>
{
    handle(event: CommonUpdatedCountryEvent): void
    {
        // console.log('UpdatedCountryEvent: ', event);
    }
}