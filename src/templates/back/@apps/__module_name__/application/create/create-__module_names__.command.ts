import { CQMetadata } from '{{ config.auroraCorePackage }}';

export class Create{{ toPascalCase schema.moduleNames }}Command
{
    constructor(
        public readonly payload: {
            {{#each schema.properties.createCommand}}
            {{#if (isAllowProperty ../schema.moduleName this) }}
            {{ toCamelCase name }}{{#if nullable}}?{{/if}}: {{ getJavascriptType }};
            {{/if}}
            {{/each}}
        } [],
        public readonly cQMetadata?: CQMetadata,
    ) {}
}