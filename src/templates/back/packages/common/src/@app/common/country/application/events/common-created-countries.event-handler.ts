import { CommonCreatedCountriesEvent } from '@app/common/country';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

@EventsHandler(CommonCreatedCountriesEvent)
export class CommonCreatedCountriesEventHandler implements IEventHandler<CommonCreatedCountriesEvent>
{
    handle(event: CommonCreatedCountriesEvent): void
    {
        // console.log('CreatedCountriesEvent: ', event);
    }
}
