export class {{ toPascalCase schema.boundedContextName }}Updated{{ toPascalCase schema.moduleName }}Event
{
    constructor(
        {{#each (getUpdatedEventProperties schema.aggregateProperties) }}
        {{#if (isAllowProperty ../schema.moduleName this) }}
        public readonly {{ toCamelCase (getNameProperty this) }}: {{ getJavascriptTypeProperty this ../config }},
        {{/if}}
        {{/each}}
    ) {}
}
