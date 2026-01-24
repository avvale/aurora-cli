import { ToolsDeletedProceduresEvent } from '@app/tools/procedure';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

@EventsHandler(ToolsDeletedProceduresEvent)
export class ToolsDeletedProceduresEventHandler
  implements IEventHandler<ToolsDeletedProceduresEvent>
{
  handle(event: ToolsDeletedProceduresEvent): void {
    // console.log('DeletedProceduresEvent: ', event);
  }
}
