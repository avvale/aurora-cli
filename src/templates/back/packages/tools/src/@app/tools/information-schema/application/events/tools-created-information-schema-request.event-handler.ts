import { ToolsCreatedInformationSchemaRequestEvent } from '@app/tools/information-schema';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

@EventsHandler(ToolsCreatedInformationSchemaRequestEvent)
export class ToolsCreatedInformationSchemaRequestEventHandler implements IEventHandler<ToolsCreatedInformationSchemaRequestEvent>
{
    handle(event: ToolsCreatedInformationSchemaRequestEvent): void
    {
        // console.log('ToolsCreatedInformationSchemaRequestEvent: ', event);
    }
}
