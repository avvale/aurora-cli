import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { Updated{{ toPascalCase schema.moduleNames }}Event } from './updated-{{ toKebabCase schema.moduleNames }}.event';

@EventsHandler(Updated{{ toPascalCase schema.moduleNames }}Event)
export class Updated{{ toPascalCase schema.moduleNames }}EventHandler implements IEventHandler<Updated{{ toPascalCase schema.moduleNames }}Event>
{
    handle(event: Updated{{ toPascalCase schema.moduleNames }}Event): void
    {
        // console.log('Updated{{ toPascalCase schema.moduleNames }}Event: ', event);
    }
}