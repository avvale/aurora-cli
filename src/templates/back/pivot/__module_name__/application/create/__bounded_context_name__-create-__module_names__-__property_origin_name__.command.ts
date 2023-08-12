export class {{ toPascalCase schema.boundedContextName }}Create{{ toPascalCase schema.moduleNames }}{{ toPascalCase currentProperty.originName }}Command
{
    constructor(
        public readonly {{ toCamelCase schema.moduleNames }}{{ toPascalCase currentProperty.originName }}: {
            {{ toCamelCase schema.moduleName }}Id: string;
            {{ toCamelCase currentProperty.relationship.singularName }}Id: string;
        } [],
    ) {}
}