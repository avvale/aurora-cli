import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { CommonCreatedCountriesEvent } from './common-created-countries.event';

@EventsHandler(CommonCreatedCountriesEvent)
export class CommonCreatedCountriesEventHandler implements IEventHandler<CommonCreatedCountriesEvent>
{
    handle(event: CommonCreatedCountriesEvent): void
    {
        // console.log('CreatedCountriesEvent: ', event);
    }
}