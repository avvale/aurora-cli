import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { CommonCreatedCountryEvent } from './common-created-country.event';

@EventsHandler(CommonCreatedCountryEvent)
export class CommonCreatedCountryEventHandler implements IEventHandler<CommonCreatedCountryEvent>
{
    handle(event: CommonCreatedCountryEvent): void
    {
        // console.log('CommonCreatedCountryEvent: ', event);
    }
}