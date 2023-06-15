import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { {{ toPascalCase schema.boundedContextName }}Updated{{ toPascalCase schema.moduleNames }}Event } from './{{ toKebabCase schema.boundedContextName }}-updated-{{ toKebabCase schema.moduleNames }}.event';

@EventsHandler({{ toPascalCase schema.boundedContextName }}Updated{{ toPascalCase schema.moduleNames }}Event)
export class {{ toPascalCase schema.boundedContextName }}Updated{{ toPascalCase schema.moduleNames }}EventHandler implements IEventHandler<{{ toPascalCase schema.boundedContextName }}Updated{{ toPascalCase schema.moduleNames }}Event>
{
    handle(event: {{ toPascalCase schema.boundedContextName }}Updated{{ toPascalCase schema.moduleNames }}Event): void
    {
        // console.log('{{ toPascalCase schema.boundedContextName }}Updated{{ toPascalCase schema.moduleNames }}Event: ', event);
    }
}