import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { {{ toPascalCase schema.boundedContextName }}Deleted{{ toPascalCase schema.moduleNames }}Event } from './{{ toKebabCase schema.boundedContextName }}-deleted-{{ toKebabCase schema.moduleNames }}.event';

@EventsHandler({{ toPascalCase schema.boundedContextName }}Deleted{{ toPascalCase schema.moduleNames }}Event)
export class {{ toPascalCase schema.boundedContextName }}Deleted{{ toPascalCase schema.moduleNames }}EventHandler implements IEventHandler<{{ toPascalCase schema.boundedContextName }}Deleted{{ toPascalCase schema.moduleNames }}Event>
{
    handle(event: {{ toPascalCase schema.boundedContextName }}Deleted{{ toPascalCase schema.moduleNames }}Event): void
    {
        // console.log('Deleted{{ toPascalCase schema.moduleNames }}Event: ', event);
    }
}