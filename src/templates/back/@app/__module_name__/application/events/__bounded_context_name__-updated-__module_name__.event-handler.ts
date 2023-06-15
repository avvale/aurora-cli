import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { {{ toPascalCase schema.boundedContextName }}Updated{{ toPascalCase schema.moduleName }}Event } from './{{ toKebabCase schema.boundedContextName }}-updated-{{ toKebabCase schema.moduleName }}.event';

@EventsHandler({{ toPascalCase schema.boundedContextName }}Updated{{ toPascalCase schema.moduleName }}Event)
export class {{ toPascalCase schema.boundedContextName }}Updated{{ toPascalCase schema.moduleName }}EventHandler implements IEventHandler<{{ toPascalCase schema.boundedContextName }}Updated{{ toPascalCase schema.moduleName }}Event>
{
    handle(event: {{ toPascalCase schema.boundedContextName }}Updated{{ toPascalCase schema.moduleName }}Event): void
    {
        // console.log('Updated{{ toPascalCase schema.moduleName }}Event: ', event);
    }
}