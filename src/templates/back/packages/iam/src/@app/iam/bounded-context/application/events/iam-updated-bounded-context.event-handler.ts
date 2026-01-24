/**
 * @aurora-generated
 * @source cliter/iam/bounded-context.aurora.yaml
 */
import { IamUpdatedBoundedContextEvent } from '@app/iam/bounded-context';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

@EventsHandler(IamUpdatedBoundedContextEvent)
export class IamUpdatedBoundedContextEventHandler
  implements IEventHandler<IamUpdatedBoundedContextEvent>
{
  handle(event: IamUpdatedBoundedContextEvent): void {
    // 'UpdatedBoundedContextEvent'
  }
}
