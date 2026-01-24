/**
 * @aurora-generated
 * @source cliter/iam/bounded-context.aurora.yaml
 */
import { IamCreatedBoundedContextsEvent } from '@app/iam/bounded-context';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

@EventsHandler(IamCreatedBoundedContextsEvent)
export class IamCreatedBoundedContextsEventHandler
  implements IEventHandler<IamCreatedBoundedContextsEvent>
{
  handle(event: IamCreatedBoundedContextsEvent): void {
    // 'CreatedBoundedContextsEvent';
  }
}
