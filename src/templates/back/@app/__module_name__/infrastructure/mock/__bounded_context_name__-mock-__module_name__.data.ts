/* eslint-disable quotes */
/* eslint-disable key-spacing */
{{#if schema.aggregateProperties.hasEnum}}
import { {{#each schema.aggregateProperties.isEnum}}{{#unless @first}}, {{/unless}}{{ toPascalCase ../schema.boundedContextName }}{{ toPascalCase ../schema.moduleName }}{{ toPascalCase name }}{{/each}} } from '@api/graphql';
{{/if}}

export const {{ toCamelCase schema.boundedContextName }}Mock{{ toPascalCase schema.moduleName }}Data = [
    {{#loops 20}}
    {
        {{#each ../schema.aggregateProperties.seed as |seedProperty seedId|}}
        {{#if (isAllowProperty ../schema.moduleName this)}}
        {{ toCamelCase seedProperty.name }}: {{#if hasQuotation }}'{{/if }}{{{ mocker (object schema=../../schema property=seedProperty type='seed' scapeQuotes=false hasUuidSeed=false) }}}{{#if hasQuotation }}'{{/if}},
        {{/if}}
        {{/each}}
    },
    {{/loops}}
];
