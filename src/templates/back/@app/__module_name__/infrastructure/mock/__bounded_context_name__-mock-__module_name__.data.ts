/* eslint-disable quotes */
/* eslint-disable key-spacing */
{{
    setVar 'importsArray' (
        array
            (object items=(array 'CQMetadata' 'IMapper' 'LiteralObject' 'MapperOptions') path=config.auroraCorePackage)

    )
~}}
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
