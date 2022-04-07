export class Created{{ toPascalCase schema.moduleName }}Event
{
    constructor(
        {{#each schema.properties.createdEvent}}
        {{#if (allowProperty ../schema.moduleName this) }}
        public readonly {{ toCamelCase name }}: {{ getJavascriptType }},
        {{/if}}
        {{/each}}
    ) {}
}