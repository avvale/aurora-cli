import { QueryStatement } from '{{ config.auroraCorePackage }}';
import { CQMetadata } from '{{ config.auroraCorePackage }}';

export class Update{{ toPascalCase schema.moduleName }}ByIdCommand
{
    constructor(
        public readonly payload: {
            {{#each schema.properties.updateCommand}}
            {{#if (allowProperty ../schema.moduleName this) }}
            {{ toCamelCase name }}{{#unlessEq name 'id'}}?{{/unlessEq}}: {{ getJavascriptType }};
            {{/if}}
            {{/each}}
        },
        public readonly constraint?: QueryStatement,
        public readonly cQMetadata?: CQMetadata,
    ) {}
}