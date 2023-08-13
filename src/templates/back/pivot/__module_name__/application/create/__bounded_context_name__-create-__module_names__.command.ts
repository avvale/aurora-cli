export class {{ toPascalCase schema.boundedContextName }}Create{{ toPascalCase schema.moduleNames }}Command
{
    constructor(
        public readonly {{ toCamelCase schema.moduleNames }}: {
            {{ toCamelCase schema.moduleName }}Id: string;
            {{ toCamelCase currentProperty.relationship.singularName }}Id: string;
        } [],
    ) {}
}