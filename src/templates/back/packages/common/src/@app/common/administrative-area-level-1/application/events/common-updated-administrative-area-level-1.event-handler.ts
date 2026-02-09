/**
 * @aurora-generated
 * @source cliter/common/administrative-area-level-1.aurora.yaml
 */
import { CommonUpdatedAdministrativeAreaLevel1Event } from '@app/common/administrative-area-level-1';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

@EventsHandler(CommonUpdatedAdministrativeAreaLevel1Event)
export class CommonUpdatedAdministrativeAreaLevel1EventHandler
  implements IEventHandler<CommonUpdatedAdministrativeAreaLevel1Event>
{
  handle(event: CommonUpdatedAdministrativeAreaLevel1Event): void {
    // 'UpdatedAdministrativeAreaLevel1Event'
  }
}
