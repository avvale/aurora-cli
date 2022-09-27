import { CQMetadata } from '{{ config.auroraCorePackage }}';

export class Upsert{{ toPascalCase schema.moduleName }}Command
{
    {{! don`t set nullable properties to avoid error "A required parameter cannot follow an optional parameter.ts(1016)" }}
    constructor(
        public readonly payload: {
            {{#each schema.properties.upsertCommand}}
            {{#if (allowProperty ../schema.moduleName this) }}
            {{ toCamelCase name }}{{#unlessEq name 'id'}}?{{/unlessEq}}: {{ getJavascriptType }};
            {{/if}}
            {{/each}}
        },
        public readonly cQMetadata?: CQMetadata,
    ) {}
}