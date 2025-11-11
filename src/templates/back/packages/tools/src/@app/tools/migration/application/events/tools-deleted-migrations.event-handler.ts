import { ToolsDeletedMigrationsEvent } from '@app/tools/migration';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

@EventsHandler(ToolsDeletedMigrationsEvent)
export class ToolsDeletedMigrationsEventHandler
    implements IEventHandler<ToolsDeletedMigrationsEvent>
{
    handle(event: ToolsDeletedMigrationsEvent): void {
        // console.log('DeletedMigrationsEvent: ', event);
    }
}
