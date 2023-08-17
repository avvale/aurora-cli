export class {{ toPascalCase schema.boundedContextName }}Deleted{{ toPascalCase schema.moduleName }}Event
{
    constructor(
        {{#each (getDeletedEventProperties schema.aggregateProperties) }}
        {{#if (isAllowProperty ../schema.moduleName this) }}
        public readonly {{ toCamelCase (getPropertyName this) }}: {{ getJavascriptTypeProperty this ../config }},
        {{/if}}
        {{/each}}
    ) {}
}
