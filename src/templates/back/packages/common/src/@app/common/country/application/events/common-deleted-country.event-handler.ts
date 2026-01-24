import { CommonDeletedCountryEvent } from '@app/common/country';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

@EventsHandler(CommonDeletedCountryEvent)
export class CommonDeletedCountryEventHandler
  implements IEventHandler<CommonDeletedCountryEvent>
{
  handle(event: CommonDeletedCountryEvent): void {
    // console.log('CommonDeletedCountryEvent: ', event);
  }
}
