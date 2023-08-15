export class {{ toPascalCase schema.boundedContextName }}Created{{ toPascalCase schema.moduleName }}Event
{
    constructor(
        {{#each (getCreatedEventProperties schema.aggregateProperties) }}
        {{#if (isAllowProperty ../schema.moduleName this) }}
        public readonly {{ toCamelCase (getNameProperty this) }}: {{ getJavascriptTypeProperty this ../config }},
        {{/if}}
        {{/each}}
    ) {}
}
