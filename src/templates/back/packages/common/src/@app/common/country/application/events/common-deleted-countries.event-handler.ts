import { CommonDeletedCountriesEvent } from '@app/common/country';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

@EventsHandler(CommonDeletedCountriesEvent)
export class CommonDeletedCountriesEventHandler
  implements IEventHandler<CommonDeletedCountriesEvent>
{
  handle(event: CommonDeletedCountriesEvent): void {
    // console.log('DeletedCountriesEvent: ', event);
  }
}
