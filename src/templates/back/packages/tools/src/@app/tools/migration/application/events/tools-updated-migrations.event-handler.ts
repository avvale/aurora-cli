import { ToolsUpdatedMigrationsEvent } from '@app/tools/migration';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

@EventsHandler(ToolsUpdatedMigrationsEvent)
export class ToolsUpdatedMigrationsEventHandler
    implements IEventHandler<ToolsUpdatedMigrationsEvent>
{
    handle(event: ToolsUpdatedMigrationsEvent): void {
        // console.log('ToolsUpdatedMigrationsEvent: ', event);
    }
}
