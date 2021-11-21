import { CQMetadata } from '{{ config.auroraCorePackage }}';

export class Create{{ toPascalCase schema.moduleNames }}Command
{
    constructor(
        public readonly payload: {
            {{#each schema.properties.createCommand}}
            {{#unless isI18n}}
            {{ toCamelCase name }}{{#if nullable}}?{{/if}}: {{ getJavascriptType }},
            {{/unless}}
            {{#and isI18n (allowI18nProperty2 ../schema.moduleName name)}}
            {{ toCamelCase name }}{{#if nullable}}?{{/if}}: {{ getJavascriptType }},
            {{/and}}
            {{/each}}
        } [],
        public readonly cQMetadata?: CQMetadata,
    ) {}
}