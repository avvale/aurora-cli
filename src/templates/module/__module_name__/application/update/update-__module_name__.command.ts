import { QueryStatement } from '{{ config.auroraCorePackage }}';
import { CQMetadata } from '{{ config.auroraCorePackage }}';

export class Update{{ toPascalCase schema.moduleName }}Command
{
    constructor(
        public readonly payload: {
            {{#each schema.properties.updateCommand}}
            {{ toCamelCase name }}{{#unlessEq name 'id'}}?{{/unlessEq}}: {{ getJavascriptType }},
            {{/each}}
        },
        public readonly constraint?: QueryStatement,
        public readonly cQMetadata?: CQMetadata,
    ) {}
}