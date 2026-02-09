/**
 * @aurora-generated
 * @source cliter/common/administrative-area-level-1.aurora.yaml
 */
import { CommonDeletedAdministrativeAreaLevel1Event } from '@app/common/administrative-area-level-1';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

@EventsHandler(CommonDeletedAdministrativeAreaLevel1Event)
export class CommonDeletedAdministrativeAreaLevel1EventHandler
  implements IEventHandler<CommonDeletedAdministrativeAreaLevel1Event>
{
  handle(event: CommonDeletedAdministrativeAreaLevel1Event): void {
    // CommonDeletedAdministrativeAreaLevel1Event'
  }
}
