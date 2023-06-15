export class {{ toPascalCase schema.boundedContextName }}Updated{{ toPascalCase schema.moduleName }}Event
{
    constructor(
        {{#each schema.properties.updatedEvent}}
        {{#if (isAllowProperty ../schema.moduleName this) }}
        public readonly {{ toCamelCase name }}: {{ getJavascriptType }},
        {{/if}}
        {{/each}}
    ) {}
}