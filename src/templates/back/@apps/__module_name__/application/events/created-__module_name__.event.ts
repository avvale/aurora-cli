export class Created{{ toPascalCase schema.moduleName }}Event
{
    constructor(
        {{#each schema.properties.createdEvent}}
        {{#if (isAllowProperty ../schema.moduleName this) }}
        public readonly {{ toCamelCase name }}: {{ getJavascriptType }},
        {{/if}}
        {{/each}}
    ) {}
}