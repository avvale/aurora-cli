import { CQMetadata } from '{{ config.auroraCorePackage }}';

export class  {{ toPascalCase schema.boundedContextName }}Create{{ toPascalCase schema.moduleNames }}Command
{
    constructor(
        public readonly payload: {
            {{#each schema.aggregateProperties.createCommand}}
            {{#if (isAllowProperty ../schema.moduleName this) }}
            {{ toCamelCase (getNameProperty this) }}{{#if nullable}}?{{/if}}: {{ getJavascriptTypeProperty this }};
            {{/if}}
            {{/each}}
        } [],
        public readonly cQMetadata?: CQMetadata,
    ) {}
}
