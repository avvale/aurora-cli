import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { Created{{ toPascalCase schema.moduleName }}Event } from './created-{{ toKebabCase schema.moduleName }}.event';

@EventsHandler(Created{{ toPascalCase schema.moduleName }}Event)
export class Created{{ toPascalCase schema.moduleName }}EventHandler implements IEventHandler<Created{{ toPascalCase schema.moduleName }}Event>
{
    handle(event: Created{{ toPascalCase schema.moduleName }}Event): void
    {
        // console.log('Created{{ toPascalCase schema.moduleName }}Event: ', event);
    }
}