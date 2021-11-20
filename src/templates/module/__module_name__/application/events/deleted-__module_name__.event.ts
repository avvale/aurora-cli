export class Deleted{{ toPascalCase schema.moduleName }}Event
{
    constructor(
        {{#each schema.properties.deletedEvent}}
        {{#unless isI18n}}
        public readonly {{ toCamelCase name }}: {{ getJavascriptType }},
        {{/unless}}
        {{#and isI18n (allowI18nProperty2 ../schema.moduleName name)}}
        public readonly {{ toCamelCase name }}: {{ getJavascriptType }},
        {{/and}}
        {{/each}}
    ) {}
}