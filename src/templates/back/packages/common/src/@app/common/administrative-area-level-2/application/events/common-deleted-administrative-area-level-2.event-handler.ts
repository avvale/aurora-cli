/**
 * @aurora-generated
 * @source cliter/common/administrative-area-level-2.aurora.yaml
 */
import { CommonDeletedAdministrativeAreaLevel2Event } from '@app/common/administrative-area-level-2';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

@EventsHandler(CommonDeletedAdministrativeAreaLevel2Event)
export class CommonDeletedAdministrativeAreaLevel2EventHandler
  implements IEventHandler<CommonDeletedAdministrativeAreaLevel2Event>
{
  handle(event: CommonDeletedAdministrativeAreaLevel2Event): void {
    // CommonDeletedAdministrativeAreaLevel2Event'
  }
}
