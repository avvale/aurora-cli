import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { {{ toPascalCase schema.boundedContextName }}Deleted{{ toPascalCase schema.moduleName }}Event } from './{{ toKebabCase schema.boundedContextName }}-deleted-{{ toKebabCase schema.moduleName }}.event';

@EventsHandler({{ toPascalCase schema.boundedContextName }}Deleted{{ toPascalCase schema.moduleName }}Event)
export class {{ toPascalCase schema.boundedContextName }}Deleted{{ toPascalCase schema.moduleName }}EventHandler implements IEventHandler<{{ toPascalCase schema.boundedContextName }}Deleted{{ toPascalCase schema.moduleName }}Event>
{
    handle(event: {{ toPascalCase schema.boundedContextName }}Deleted{{ toPascalCase schema.moduleName }}Event): void
    {
        // console.log('{{ toPascalCase schema.boundedContextName }}Deleted{{ toPascalCase schema.moduleName }}Event: ', event);
    }
}
