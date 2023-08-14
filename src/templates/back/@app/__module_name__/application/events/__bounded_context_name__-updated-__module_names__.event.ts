import { {{ toPascalCase schema.boundedContextName }}Updated{{ toPascalCase schema.moduleName }}Event } from './{{ toKebabCase schema.boundedContextName }}-updated-{{ toKebabCase schema.moduleName }}.event';

export class {{ toPascalCase schema.boundedContextName }}Updated{{ toPascalCase schema.moduleNames }}Event
{
    constructor(
        public readonly {{ toCamelCase schema.moduleNames }}: {{ toPascalCase schema.boundedContextName }}Updated{{ toPascalCase schema.moduleName }}Event[],
    ) {}
}
