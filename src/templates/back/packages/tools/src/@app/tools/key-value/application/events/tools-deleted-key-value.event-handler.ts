import { ToolsDeletedKeyValueEvent } from '@app/tools/key-value';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

@EventsHandler(ToolsDeletedKeyValueEvent)
export class ToolsDeletedKeyValueEventHandler
    implements IEventHandler<ToolsDeletedKeyValueEvent>
{
    handle(event: ToolsDeletedKeyValueEvent): void {
        // console.log('ToolsDeletedKeyValueEvent: ', event);
    }
}
