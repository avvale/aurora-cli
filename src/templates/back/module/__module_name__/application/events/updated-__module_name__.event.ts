export class Updated{{ toPascalCase schema.moduleName }}Event
{
    constructor(
        {{#each schema.properties.updatedEvent}}
        {{#if (allowProperty ../schema.moduleName this) }}
        public readonly {{ toCamelCase name }}: {{ getJavascriptType }},
        {{/if}}
        {{/each}}
    ) {}
}