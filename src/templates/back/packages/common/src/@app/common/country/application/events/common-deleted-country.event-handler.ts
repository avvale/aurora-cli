import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { CommonDeletedCountryEvent } from './common-deleted-country.event';

@EventsHandler(CommonDeletedCountryEvent)
export class CommonDeletedCountryEventHandler implements IEventHandler<CommonDeletedCountryEvent>
{
    handle(event: CommonDeletedCountryEvent): void
    {
        // console.log('CommonDeletedCountryEvent: ', event);
    }
}
