import { ToolsCreatedKeyValueEvent } from '@app/tools/key-value';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

@EventsHandler(ToolsCreatedKeyValueEvent)
export class ToolsCreatedKeyValueEventHandler
  implements IEventHandler<ToolsCreatedKeyValueEvent>
{
  handle(event: ToolsCreatedKeyValueEvent): void {
    // console.log('ToolsCreatedKeyValueEvent: ', event);
  }
}
