export class Deleted{{ toPascalCase schema.moduleName }}Event
{
    constructor(
        {{#each schema.properties.deletedEvent}}
        public readonly {{ toCamelCase name }}: {{ getJavascriptType }},
        {{/each}}
    ) {}
}