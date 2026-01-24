import { ToolsUpdatedProcedureEvent } from '@app/tools/procedure';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

@EventsHandler(ToolsUpdatedProcedureEvent)
export class ToolsUpdatedProcedureEventHandler
  implements IEventHandler<ToolsUpdatedProcedureEvent>
{
  handle(event: ToolsUpdatedProcedureEvent): void {
    // console.log('UpdatedProcedureEvent: ', event);
  }
}
