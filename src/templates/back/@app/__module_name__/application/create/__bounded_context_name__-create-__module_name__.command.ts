import { CQMetadata } from '{{ config.auroraCorePackage }}';

export class {{ toPascalCase schema.boundedContextName }}Create{{ toPascalCase schema.moduleName }}Command
{
    {{! don`t set nullable properties to avoid error "A required parameter cannot follow an optional parameter.ts(1016)" }}
    constructor(
        public readonly payload: {
            {{#each schema.aggregateProperties.createCommand}}
            {{#if (isAllowProperty ../schema.moduleName this) }}
            {{ toCamelCase (getNameProperty this) }}{{#if nullable}}?{{/if}}: {{ getJavascriptTypeProperty this }};
            {{/if}}
            {{/each}}
        },
        public readonly cQMetadata?: CQMetadata,
    ) {}
}
