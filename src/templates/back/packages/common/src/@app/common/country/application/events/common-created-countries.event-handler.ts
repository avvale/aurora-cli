/**
 * @aurora-generated
 * @source cliter/common/country.aurora.yaml
 */
import { CommonCreatedCountriesEvent } from '@app/common/country';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

@EventsHandler(CommonCreatedCountriesEvent)
export class CommonCreatedCountriesEventHandler
  implements IEventHandler<CommonCreatedCountriesEvent>
{
  handle(event: CommonCreatedCountriesEvent): void {
    // 'CreatedCountriesEvent';
  }
}
