export class Deleted{{ toPascalCase schema.moduleName }}Event
{
    constructor(
        {{#each schema.properties.deletedEvent}}
        {{#if (allowProperty ../schema.moduleName this) }}
        public readonly {{ toCamelCase name }}: {{ getJavascriptType }},
        {{/if}}
        {{/each}}
    ) {}
}