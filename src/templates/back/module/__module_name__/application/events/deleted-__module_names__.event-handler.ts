import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { Deleted{{ toPascalCase schema.moduleNames }}Event } from './deleted-{{ toKebabCase schema.moduleNames }}.event';

@EventsHandler(Deleted{{ toPascalCase schema.moduleNames }}Event)
export class Deleted{{ toPascalCase schema.moduleNames }}EventHandler implements IEventHandler<Deleted{{ toPascalCase schema.moduleNames }}Event>
{
    handle(event: Deleted{{ toPascalCase schema.moduleNames }}Event): void
    {
        // console.log('Deleted{{ toPascalCase schema.moduleNames }}Event: ', event);
    }
}