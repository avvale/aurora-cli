import { ToolsDeletedMigrationEvent } from '@app/tools/migration';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

@EventsHandler(ToolsDeletedMigrationEvent)
export class ToolsDeletedMigrationEventHandler implements IEventHandler<ToolsDeletedMigrationEvent>
{
    handle(event: ToolsDeletedMigrationEvent): void
    {
        // console.log('ToolsDeletedMigrationEvent: ', event);
    }
}
