import { CQMetadata } from '{{ config.auroraCorePackage }}';

export class Create{{ toPascalCase schema.moduleNames }}Command
{
    constructor(
        public readonly payload: {
            {{#each schema.properties.createCommand}}
            {{ toCamelCase name }}{{#if nullable}}?{{/if}}: {{ getJavascriptType }},
            {{/each}}
            {{#each schema.propertiesI18n.createCommandHandler}}
            {{#if @first}}

            // i18n
            {{/if}}
            {{#allowI18nProperty ../schema.moduleName name}}
            {{ toCamelCase name }}{{#if nullable}}?{{/if}}: {{ getJavascriptType }},
            {{/allowI18nProperty}}
            {{/each}}
        } [],
        public readonly cQMetadata?: CQMetadata,
    ) {}
}