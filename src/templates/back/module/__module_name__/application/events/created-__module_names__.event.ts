import { Created{{ toPascalCase schema.moduleName }}Event } from './created-{{ toKebabCase schema.moduleName }}.event';

export class Created{{ toPascalCase schema.moduleNames }}Event
{
    constructor(
        public readonly {{ toCamelCase schema.moduleNames }}: Created{{ toPascalCase schema.moduleName }}Event[],
    ) {}
}