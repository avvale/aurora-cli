/**
 * @aurora-generated
 * @source cliter/common/lang.aurora.yaml
 */
import { CommonCreatedLangEvent } from '@app/common/lang';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

@EventsHandler(CommonCreatedLangEvent)
export class CommonCreatedLangEventHandler
  implements IEventHandler<CommonCreatedLangEvent>
{
  handle(event: CommonCreatedLangEvent): void {
    // 'CommonCreatedLangEvent'
  }
}
