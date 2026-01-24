import { CommonUpdatedCountriesEvent } from '@app/common/country';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

@EventsHandler(CommonUpdatedCountriesEvent)
export class CommonUpdatedCountriesEventHandler
  implements IEventHandler<CommonUpdatedCountriesEvent>
{
  handle(event: CommonUpdatedCountriesEvent): void {
    // console.log('CommonUpdatedCountriesEvent: ', event);
  }
}
