import { {{ toPascalCase schema.boundedContextName }}Created{{ toPascalCase schema.moduleName }}Event } from './{{ toKebabCase schema.boundedContextName }}-created-{{ toKebabCase schema.moduleName }}.event';

export class {{ toPascalCase schema.boundedContextName }}Created{{ toPascalCase schema.moduleNames }}Event
{
    constructor(
        public readonly {{ toCamelCase schema.moduleNames }}: {{ toPascalCase schema.boundedContextName }}Created{{ toPascalCase schema.moduleName }}Event[],
    ) {}
}