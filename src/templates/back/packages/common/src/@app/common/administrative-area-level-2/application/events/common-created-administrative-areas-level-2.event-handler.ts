/**
 * @aurora-generated
 * @source cliter/common/administrative-area-level-2.aurora.yaml
 */
import { CommonCreatedAdministrativeAreasLevel2Event } from '@app/common/administrative-area-level-2';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

@EventsHandler(CommonCreatedAdministrativeAreasLevel2Event)
export class CommonCreatedAdministrativeAreasLevel2EventHandler
  implements IEventHandler<CommonCreatedAdministrativeAreasLevel2Event>
{
  handle(event: CommonCreatedAdministrativeAreasLevel2Event): void {
    // 'CreatedAdministrativeAreasLevel2Event';
  }
}
