import { ToolsDeletedKeyValuesEvent } from '@app/tools/key-value';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

@EventsHandler(ToolsDeletedKeyValuesEvent)
export class ToolsDeletedKeyValuesEventHandler
    implements IEventHandler<ToolsDeletedKeyValuesEvent>
{
    handle(event: ToolsDeletedKeyValuesEvent): void {
        // console.log('DeletedKeyValuesEvent: ', event);
    }
}
