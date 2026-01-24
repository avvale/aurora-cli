import { ToolsCreatedMigrationEvent } from '@app/tools/migration';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

@EventsHandler(ToolsCreatedMigrationEvent)
export class ToolsCreatedMigrationEventHandler
  implements IEventHandler<ToolsCreatedMigrationEvent>
{
  handle(event: ToolsCreatedMigrationEvent): void {
    // console.log('ToolsCreatedMigrationEvent: ', event);
  }
}
