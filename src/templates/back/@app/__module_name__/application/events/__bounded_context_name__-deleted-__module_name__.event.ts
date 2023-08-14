export class {{ toPascalCase schema.boundedContextName }}Deleted{{ toPascalCase schema.moduleName }}Event
{
    constructor(
        {{#each schema.aggregateProperties.deletedEvent}}
        {{#if (isAllowProperty ../schema.moduleName this) }}
        public readonly {{ toCamelCase name }}: {{ getJavascriptType }},
        {{/if}}
        {{/each}}
    ) {}
}
