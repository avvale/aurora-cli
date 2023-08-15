export class {{ toPascalCase schema.boundedContextName }}Created{{ toPascalCase schema.moduleName }}Event
{
    constructor(
        {{#each schema.aggregateProperties.createdEvent}}
        {{#if (isAllowProperty ../schema.moduleName this) }}
        public readonly {{ toCamelCase (getNameProperty this) }}: {{ getJavascriptTypeProperty this }},
        {{/if}}
        {{/each}}
    ) {}
}
