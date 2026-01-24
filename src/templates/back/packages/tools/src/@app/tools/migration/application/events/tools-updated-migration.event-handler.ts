import { ToolsUpdatedMigrationEvent } from '@app/tools/migration';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

@EventsHandler(ToolsUpdatedMigrationEvent)
export class ToolsUpdatedMigrationEventHandler
  implements IEventHandler<ToolsUpdatedMigrationEvent>
{
  handle(event: ToolsUpdatedMigrationEvent): void {
    // console.log('UpdatedMigrationEvent: ', event);
  }
}
