import { CQMetadata } from '{{ config.auroraCorePackage }}';

export class Upsert{{ toPascalCase schema.moduleNames }}Command
{
    constructor(
        public readonly payload: {
            {{#each schema.properties.upsertCommand}}
            {{#if (allowProperty ../schema.moduleName this) }}
            {{ toCamelCase name }}{{#unlessEq name 'id'}}?{{/unlessEq}}: {{ getJavascriptType }};
            {{/if}}
            {{/each}}
        } [],
        public readonly cQMetadata?: CQMetadata,
    ) {}
}