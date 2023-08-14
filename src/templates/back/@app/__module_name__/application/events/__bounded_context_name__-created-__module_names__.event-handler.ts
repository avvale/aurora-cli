import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { {{ toPascalCase schema.boundedContextName }}Created{{ toPascalCase schema.moduleNames }}Event } from './{{ toKebabCase schema.boundedContextName }}-created-{{ toKebabCase schema.moduleNames }}.event';

@EventsHandler({{ toPascalCase schema.boundedContextName }}Created{{ toPascalCase schema.moduleNames }}Event)
export class {{ toPascalCase schema.boundedContextName }}Created{{ toPascalCase schema.moduleNames }}EventHandler implements IEventHandler<{{ toPascalCase schema.boundedContextName }}Created{{ toPascalCase schema.moduleNames }}Event>
{
    handle(event: {{ toPascalCase schema.boundedContextName }}Created{{ toPascalCase schema.moduleNames }}Event): void
    {
        // console.log('Created{{ toPascalCase schema.moduleNames }}Event: ', event);
    }
}
