import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { Created{{ toPascalCase schema.moduleNames }}Event } from './created-{{ toKebabCase schema.moduleNames }}.event';

@EventsHandler(Created{{ toPascalCase schema.moduleNames }}Event)
export class Created{{ toPascalCase schema.moduleNames }}EventHandler implements IEventHandler<Created{{ toPascalCase schema.moduleNames }}Event>
{
    handle(event: Created{{ toPascalCase schema.moduleNames }}Event)
    {
        // console.log('Created{{ toPascalCase schema.moduleNames }}Event: ', event);
    }
}