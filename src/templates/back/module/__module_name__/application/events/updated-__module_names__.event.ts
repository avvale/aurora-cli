import { Updated{{ toPascalCase schema.moduleName }}Event } from './updated-{{ toKebabCase schema.moduleName }}.event';

export class Updated{{ toPascalCase schema.moduleNames }}Event
{
    constructor(
        public readonly {{ toCamelCase schema.moduleNames }}: Updated{{ toPascalCase schema.moduleName }}Event[],
    ) {}
}