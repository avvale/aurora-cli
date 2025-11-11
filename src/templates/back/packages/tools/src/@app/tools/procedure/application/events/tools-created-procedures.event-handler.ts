import { ToolsCreatedProceduresEvent } from '@app/tools/procedure';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

@EventsHandler(ToolsCreatedProceduresEvent)
export class ToolsCreatedProceduresEventHandler
    implements IEventHandler<ToolsCreatedProceduresEvent>
{
    handle(event: ToolsCreatedProceduresEvent): void {
        // console.log('CreatedProceduresEvent: ', event);
    }
}
