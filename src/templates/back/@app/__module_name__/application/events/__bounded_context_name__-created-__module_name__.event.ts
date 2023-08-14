export class {{ toPascalCase schema.boundedContextName }}Created{{ toPascalCase schema.moduleName }}Event
{
    constructor(
        {{#each schema.aggregateProperties.createdEvent}}
        {{#if (isAllowProperty ../schema.moduleName this) }}
        public readonly {{ toCamelCase name }}: {{ getJavascriptType }},
        {{/if}}
        {{/each}}
    ) {}
}
