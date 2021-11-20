export class Updated{{ toPascalCase schema.moduleName }}Event
{
    constructor(
        {{#each schema.properties.updatedEvent}}
        {{#unless isI18n}}
        public readonly {{ toCamelCase name }}: {{ getJavascriptType }},
        {{/unless}}
        {{#and isI18n (allowI18nProperty2 ../schema.moduleName name)}}
        public readonly {{ toCamelCase name }}: {{ getJavascriptType }},
        {{/and}}
        {{/each}}
    ) {}
}