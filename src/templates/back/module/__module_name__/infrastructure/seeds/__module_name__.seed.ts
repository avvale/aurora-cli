/* eslint-disable quotes */
/* eslint-disable key-spacing */
{{#if schema.properties.hasEnum}}
import { {{#each schema.properties.isEnum}}{{#unless @first}}, {{/unless}}{{ toPascalCase ../schema.boundedContextName }}{{ toPascalCase ../schema.moduleName }}{{ toPascalCase name }}{{/each}} } from '@api/graphql';
{{/if}}

export const {{ toCamelCase schema.moduleNames }} = [
    {{#loops 20}}
    {
        {{#each ../schema.properties.seed as |seedProperty seedId|}}
        {{#if (allowProperty ../schema.moduleName this)}}
        {{ toCamelCase seedProperty.name }}: {{#if hasQuotation }}'{{/if }}{{{ mocker (object schema=../../schema property=seedProperty type='seed' scapeQuotes=false hasUuidSeed=false) }}}{{#if hasQuotation }}'{{/if}},
        {{/if}}
        {{/each}}
    },
    {{/loops}}
];