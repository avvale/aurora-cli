import { CQMetadata } from '{{ config.applicationsContainer }}/shared/domain/lib/hades.types';

export class Create{{ toPascalCase schema.moduleName }}Command
{
    {{! don`t set nullable properties to avoid error "A required parameter cannot follow an optional parameter.ts(1016)" }}
    constructor(
        public readonly payload: {
            {{#each schema.properties.createCommand}}
            {{ toCamelCase name }}{{#if nullable}}?{{/if}}: {{ getJavascriptType }},
            {{/each}}
        },
        public readonly cQMetadata?: CQMetadata,
    ) {}
}