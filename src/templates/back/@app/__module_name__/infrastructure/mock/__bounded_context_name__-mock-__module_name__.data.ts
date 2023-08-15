/* eslint-disable quotes */
/* eslint-disable key-spacing */
{{#if schema.aggregateProperties.hasEnum}}
import { {{#each (getEnumProperties schema.aggregateProperties) }}{{#unless @first}}, {{/unless}}{{ toPascalCase ../schema.boundedContextName }}{{ toPascalCase ../schema.moduleName }}{{ toPascalCase (getNameProperty this) }}{{/each}} } from '@api/graphql';
{{/if}}

export const {{ toCamelCase schema.boundedContextName }}Mock{{ toPascalCase schema.moduleName }}Data = [
    {{#loops 20}}
    {
        {{#each (getSeedProperties ../schema.aggregateProperties) as |seedProperty seedId|}}
        {{#if (isAllowProperty ../schema.moduleName this)}}
        {{ toCamelCase (getNameProperty seedProperty) }}: {{#if hasQuotation }}'{{/if }}{{{ mocker (object schema=../../schema property=seedProperty type='seed' scapeQuotes=false hasUuidSeed=false) }}}{{#if hasQuotation }}'{{/if}},
        {{/if}}
        {{/each}}
    },
    {{/loops}}
];
