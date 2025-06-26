import { ToolsUpdatedProceduresEvent } from '@app/tools/procedure';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

@EventsHandler(ToolsUpdatedProceduresEvent)
export class ToolsUpdatedProceduresEventHandler implements IEventHandler<ToolsUpdatedProceduresEvent>
{
    handle(event: ToolsUpdatedProceduresEvent): void
    {
        // console.log('ToolsUpdatedProceduresEvent: ', event);
    }
}
