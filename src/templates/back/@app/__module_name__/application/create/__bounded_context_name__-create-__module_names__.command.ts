import { CQMetadata } from '{{ config.auroraCorePackage }}';

export class  {{ toPascalCase schema.boundedContextName }}Create{{ toPascalCase schema.moduleNames }}Command
{
    constructor(
        public readonly payload: {
            {{#each (getCreateCommandProperties schema.aggregateProperties) }}
            {{#if (isAllowProperty ../schema.moduleName this) }}
            {{ toCamelCase (getPropertyName this) }}{{#if nullable}}?{{/if}}: {{ getJavascriptTypeProperty this ../config }};
            {{/if}}
            {{/each}}
        } [],
        public readonly cQMetadata?: CQMetadata,
    ) {}
}
