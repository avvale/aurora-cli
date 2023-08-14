import { QueryStatement } from '{{ config.auroraCorePackage }}';
import { CQMetadata } from '{{ config.auroraCorePackage }}';

export class {{ toPascalCase schema.boundedContextName }}Update{{ toPascalCase schema.moduleName }}ByIdCommand
{
    constructor(
        public readonly payload: {
            {{#each schema.aggregateProperties.updateCommand}}
            {{#if (isAllowProperty ../schema.moduleName this) }}
            {{ toCamelCase name }}{{#unlessEq name 'id'}}?{{/unlessEq}}: {{ getJavascriptType }};
            {{/if}}
            {{/each}}
        },
        public readonly constraint?: QueryStatement,
        public readonly cQMetadata?: CQMetadata,
    ) {}
}
