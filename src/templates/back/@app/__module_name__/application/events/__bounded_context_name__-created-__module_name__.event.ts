export class {{ toPascalCase schema.boundedContextName }}Created{{ toPascalCase schema.moduleName }}Event
{
    constructor(
        {{#each (getCreatedEventProperties schema.aggregateProperties) }}
        {{#if (isAllowProperty ../schema.moduleName this) }}
        public readonly {{ toCamelCase (getPropertyName this) }}: {{ getJavascriptTypeProperty this ../config }},
        {{/if}}
        {{/each}}
    ) {}
}
