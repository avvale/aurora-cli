import { CommonCreatedCountryEvent } from '@app/common/country';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

@EventsHandler(CommonCreatedCountryEvent)
export class CommonCreatedCountryEventHandler implements IEventHandler<CommonCreatedCountryEvent>
{
    handle(event: CommonCreatedCountryEvent): void
    {
        // console.log('CommonCreatedCountryEvent: ', event);
    }
}
