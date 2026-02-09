/**
 * @aurora-generated
 * @source cliter/common/lang.aurora.yaml
 */
import { CommonCreatedLangsEvent } from '@app/common/lang';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

@EventsHandler(CommonCreatedLangsEvent)
export class CommonCreatedLangsEventHandler
  implements IEventHandler<CommonCreatedLangsEvent>
{
  handle(event: CommonCreatedLangsEvent): void {
    // 'CreatedLangsEvent';
  }
}
