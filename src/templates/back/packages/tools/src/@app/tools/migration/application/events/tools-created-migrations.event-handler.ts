import { ToolsCreatedMigrationsEvent } from '@app/tools/migration';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

@EventsHandler(ToolsCreatedMigrationsEvent)
export class ToolsCreatedMigrationsEventHandler
  implements IEventHandler<ToolsCreatedMigrationsEvent>
{
  handle(event: ToolsCreatedMigrationsEvent): void {
    // console.log('CreatedMigrationsEvent: ', event);
  }
}
