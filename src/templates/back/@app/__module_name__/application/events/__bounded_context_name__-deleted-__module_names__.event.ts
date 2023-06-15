import { {{ toPascalCase schema.boundedContextName }}Deleted{{ toPascalCase schema.moduleName }}Event } from './{{ toKebabCase schema.boundedContextName }}-deleted-{{ toKebabCase schema.moduleName }}.event';

export class {{ toPascalCase schema.boundedContextName }}Deleted{{ toPascalCase schema.moduleNames }}Event
{
    constructor(
        public readonly {{ toCamelCase schema.moduleNames }}: {{ toPascalCase schema.boundedContextName }}Deleted{{ toPascalCase schema.moduleName }}Event[],
    ) {}
}