import { ToolsUpdatedKeyValueEvent } from '@app/tools/key-value';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

@EventsHandler(ToolsUpdatedKeyValueEvent)
export class ToolsUpdatedKeyValueEventHandler implements IEventHandler<ToolsUpdatedKeyValueEvent>
{
    handle(event: ToolsUpdatedKeyValueEvent): void
    {
        // console.log('UpdatedKeyValueEvent: ', event);
    }
}
