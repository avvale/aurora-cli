/**
 * @aurora-generated
 * @source cliter/iam/bounded-context.aurora.yaml
 */
import { IamCreatedBoundedContextEvent } from '@app/iam/bounded-context';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

@EventsHandler(IamCreatedBoundedContextEvent)
export class IamCreatedBoundedContextEventHandler
  implements IEventHandler<IamCreatedBoundedContextEvent>
{
  handle(event: IamCreatedBoundedContextEvent): void {
    // 'IamCreatedBoundedContextEvent'
  }
}
