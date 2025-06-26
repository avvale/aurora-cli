import { ToolsDeletedProcedureEvent } from '@app/tools/procedure';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

@EventsHandler(ToolsDeletedProcedureEvent)
export class ToolsDeletedProcedureEventHandler implements IEventHandler<ToolsDeletedProcedureEvent>
{
    handle(event: ToolsDeletedProcedureEvent): void
    {
        // console.log('ToolsDeletedProcedureEvent: ', event);
    }
}
