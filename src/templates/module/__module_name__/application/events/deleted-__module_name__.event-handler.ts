import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { Deleted{{ toPascalCase schema.moduleName }}Event } from './deleted-{{ toKebabCase schema.moduleName }}.event';

@EventsHandler(Deleted{{ toPascalCase schema.moduleName }}Event)
export class Deleted{{ toPascalCase schema.moduleName }}EventHandler implements IEventHandler<Deleted{{ toPascalCase schema.moduleName }}Event>
{
    handle(event: Deleted{{ toPascalCase schema.moduleName }}Event)
    {
        // console.log('Deleted{{ toPascalCase schema.moduleName }}Event: ', event);
    }
}