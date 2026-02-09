/**
 * @aurora-generated
 * @source cliter/common/administrative-area-level-3.aurora.yaml
 */
import { CommonDeletedAdministrativeAreaLevel3Event } from '@app/common/administrative-area-level-3';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

@EventsHandler(CommonDeletedAdministrativeAreaLevel3Event)
export class CommonDeletedAdministrativeAreaLevel3EventHandler
  implements IEventHandler<CommonDeletedAdministrativeAreaLevel3Event>
{
  handle(event: CommonDeletedAdministrativeAreaLevel3Event): void {
    // CommonDeletedAdministrativeAreaLevel3Event'
  }
}
