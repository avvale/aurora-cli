import { IamCreatedTagsEvent } from '@app/iam/tag';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

@EventsHandler(IamCreatedTagsEvent)
export class IamCreatedTagsEventHandler
  implements IEventHandler<IamCreatedTagsEvent>
{
  handle(event: IamCreatedTagsEvent): void {
    // console.log('CreatedTagsEvent: ', event);
  }
}
