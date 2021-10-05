import { CQMetadata } from '{{ config.auroraCorePackage }}';

export class Create{{ toPascalCase schema.moduleNames }}Command
{
    constructor(
        public readonly payload: {
            {{#each schema.properties.createCommand}}
            {{ toCamelCase name }}{{#if nullable}}?{{/if}}: {{ getJavascriptType }},
            {{/each}}
        } [],
        public readonly cQMetadata?: CQMetadata,
    ) {}
}