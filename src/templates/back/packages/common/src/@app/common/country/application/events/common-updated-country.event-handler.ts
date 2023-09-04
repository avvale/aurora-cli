import { CommonUpdatedCountryEvent } from '@app/common/country';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

@EventsHandler(CommonUpdatedCountryEvent)
export class CommonUpdatedCountryEventHandler implements IEventHandler<CommonUpdatedCountryEvent>
{
    handle(event: CommonUpdatedCountryEvent): void
    {
        // console.log('UpdatedCountryEvent: ', event);
    }
}
