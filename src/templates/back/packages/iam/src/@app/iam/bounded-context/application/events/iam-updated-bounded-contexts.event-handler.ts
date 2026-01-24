/**
 * @aurora-generated
 * @source cliter/iam/bounded-context.aurora.yaml
 */
import { IamUpdatedBoundedContextsEvent } from '@app/iam/bounded-context';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

@EventsHandler(IamUpdatedBoundedContextsEvent)
export class IamUpdatedBoundedContextsEventHandler
  implements IEventHandler<IamUpdatedBoundedContextsEvent>
{
  handle(event: IamUpdatedBoundedContextsEvent): void {
    // 'IamUpdatedBoundedContextsEvent'
  }
}
