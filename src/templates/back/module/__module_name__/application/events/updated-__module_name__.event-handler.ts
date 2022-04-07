import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { Updated{{ toPascalCase schema.moduleName }}Event } from './updated-{{ toKebabCase schema.moduleName }}.event';

@EventsHandler(Updated{{ toPascalCase schema.moduleName }}Event)
export class Updated{{ toPascalCase schema.moduleName }}EventHandler implements IEventHandler<Updated{{ toPascalCase schema.moduleName }}Event>
{
    handle(event: Updated{{ toPascalCase schema.moduleName }}Event)
    {
        // console.log('Updated{{ toPascalCase schema.moduleName }}Event: ', event);
    }
}