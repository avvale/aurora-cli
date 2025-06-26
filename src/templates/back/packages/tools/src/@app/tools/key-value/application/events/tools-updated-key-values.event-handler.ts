import { ToolsUpdatedKeyValuesEvent } from '@app/tools/key-value';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

@EventsHandler(ToolsUpdatedKeyValuesEvent)
export class ToolsUpdatedKeyValuesEventHandler implements IEventHandler<ToolsUpdatedKeyValuesEvent>
{
    handle(event: ToolsUpdatedKeyValuesEvent): void
    {
        // console.log('ToolsUpdatedKeyValuesEvent: ', event);
    }
}
