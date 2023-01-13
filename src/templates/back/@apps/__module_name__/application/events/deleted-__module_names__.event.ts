import { Deleted{{ toPascalCase schema.moduleName }}Event } from './deleted-{{ toKebabCase schema.moduleName }}.event';

export class Deleted{{ toPascalCase schema.moduleNames }}Event
{
    constructor(
        public readonly {{ toCamelCase schema.moduleNames }}: Deleted{{ toPascalCase schema.moduleName }}Event[],
    ) {}
}