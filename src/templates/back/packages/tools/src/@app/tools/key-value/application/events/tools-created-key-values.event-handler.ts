import { ToolsCreatedKeyValuesEvent } from '@app/tools/key-value';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

@EventsHandler(ToolsCreatedKeyValuesEvent)
export class ToolsCreatedKeyValuesEventHandler
    implements IEventHandler<ToolsCreatedKeyValuesEvent>
{
    handle(event: ToolsCreatedKeyValuesEvent): void {
        // console.log('CreatedKeyValuesEvent: ', event);
    }
}
