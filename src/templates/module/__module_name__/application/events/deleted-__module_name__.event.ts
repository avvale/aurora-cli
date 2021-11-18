export class Deleted{{ toPascalCase schema.moduleName }}Event
{
    constructor(
        {{#each schema.properties.deletedEvent}}
        public readonly {{ toCamelCase name }}: {{ getJavascriptType }},
        {{/each}}
        {{#each schema.propertiesI18n.aggregateI18n}}
        {{#if @first}}

        // i18n
        {{/if}}
        {{#allowI18nProperty ../schema.moduleName name}}
        public readonly {{ toCamelCase name }}: {{ getJavascriptType }},
        {{/allowI18nProperty}}
        {{/each}}
    ) {}
}