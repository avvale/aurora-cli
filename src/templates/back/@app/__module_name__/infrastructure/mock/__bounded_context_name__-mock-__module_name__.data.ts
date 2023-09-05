/* eslint-disable quotes */
/* eslint-disable key-spacing */
{{ setVar 'importsArray' (array) ~}}
{{#if (hasEnumProperties schema.aggregateProperties) }}
{{#each (getEnumProperties schema.aggregateProperties) }}
{{#unless first}}
{{
    push ../importsArray
        (
            object
                items=(sumStrings (toPascalCase ../schema.boundedContextName) (toPascalCase ../schema.moduleName) (toPascalCase name))
                path='@api/graphql'
        )
~}}
{{/unless}}
{{/each}}
{{/if}}
{{{ importManager (object imports=importsArray) }}}
export const {{ toCamelCase schema.boundedContextName }}Mock{{ toPascalCase schema.moduleName }}Data = [
    {{#loops 20}}
    {
        {{#each (getSeedProperties ../schema.aggregateProperties) as |seedProperty seedId|}}
        {{#if (isAllowProperty ../schema.moduleName this)}}
        {{ toCamelCase (getPropertyName seedProperty) }}: {{#if (hasQuotationProperty this ../../config) }}'{{/if }}{{{ mocker (object schema=../../schema property=seedProperty type='seed' scapeQuotes=false hasUuidSeed=false) }}}{{#if (hasQuotationProperty this ../../config) }}'{{/if}},
        {{/if}}
        {{/each}}
    },
    {{/loops}}
];
