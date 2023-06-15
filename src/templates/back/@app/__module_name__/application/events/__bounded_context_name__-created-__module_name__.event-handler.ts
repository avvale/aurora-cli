import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { {{ toPascalCase schema.boundedContextName }}Created{{ toPascalCase schema.moduleName }}Event } from './{{ toKebabCase schema.boundedContextName }}-created-{{ toKebabCase schema.moduleName }}.event';

@EventsHandler({{ toPascalCase schema.boundedContextName }}Created{{ toPascalCase schema.moduleName }}Event)
export class {{ toPascalCase schema.boundedContextName }}Created{{ toPascalCase schema.moduleName }}EventHandler implements IEventHandler<{{ toPascalCase schema.boundedContextName }}Created{{ toPascalCase schema.moduleName }}Event>
{
    handle(event: {{ toPascalCase schema.boundedContextName }}Created{{ toPascalCase schema.moduleName }}Event): void
    {
        // console.log('{{ toPascalCase schema.boundedContextName }}Created{{ toPascalCase schema.moduleName }}Event: ', event);
    }
}