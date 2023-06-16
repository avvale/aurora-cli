import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { CommonDeletedCountriesEvent } from './common-deleted-countries.event';

@EventsHandler(CommonDeletedCountriesEvent)
export class CommonDeletedCountriesEventHandler implements IEventHandler<CommonDeletedCountriesEvent>
{
    handle(event: CommonDeletedCountriesEvent): void
    {
        // console.log('DeletedCountriesEvent: ', event);
    }
}