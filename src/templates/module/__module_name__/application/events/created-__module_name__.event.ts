export class Created{{ toPascalCase schema.moduleName }}Event
{
    constructor(
        {{#each schema.properties.createdEvent}}
        public readonly {{ toCamelCase name }}: {{ getJavascriptType }},
        {{/each}}
    ) {}
}