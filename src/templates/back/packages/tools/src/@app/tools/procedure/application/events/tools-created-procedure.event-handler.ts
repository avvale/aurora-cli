import { ToolsCreatedProcedureEvent } from '@app/tools/procedure';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

@EventsHandler(ToolsCreatedProcedureEvent)
export class ToolsCreatedProcedureEventHandler
  implements IEventHandler<ToolsCreatedProcedureEvent>
{
  handle(event: ToolsCreatedProcedureEvent): void {
    // console.log('ToolsCreatedProcedureEvent: ', event);
  }
}
