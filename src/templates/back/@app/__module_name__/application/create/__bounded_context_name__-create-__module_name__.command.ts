import { CQMetadata } from '{{ config.auroraCorePackage }}';

export class {{ toPascalCase schema.boundedContextName }}Create{{ toPascalCase schema.moduleName }}Command
{
    {{! don`t set nullable properties to avoid error "A required parameter cannot follow an optional parameter.ts(1016)" }}
    constructor(
        public readonly payload: {
            {{#each (getCreateCommandProperties schema.aggregateProperties) }}
            {{#if (isAllowProperty ../schema.moduleName this) }}
            {{ toCamelCase (getPropertyName this) }}{{#if nullable}}?{{/if}}: {{ getPropertyJavascriptType this ../config }};
            {{/if}}
            {{/each}}
        },
        public readonly cQMetadata?: CQMetadata,
    ) {}
}
