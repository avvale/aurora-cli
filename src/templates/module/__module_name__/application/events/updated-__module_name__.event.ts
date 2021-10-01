export class Updated{{ toPascalCase schema.moduleName }}Event
{
    constructor(
        {{#each schema.properties.updatedEvent}}
        public readonly {{ toCamelCase name }}: {{ getJavascriptType }},
        {{/each}}
    ) {}
}