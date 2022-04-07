/* eslint-disable quotes */
/* eslint-disable key-spacing */
export const {{ toCamelCase schema.moduleNames }} = [
    {{#loops 20}}
    {
        {{#each ../schema.properties.seed as |seedProperty seedId|}}
        {{#if (allowProperty ../schema.moduleName this)}}
        {{ toCamelCase seedProperty.name }}: {{#if hasQuotation }}'{{/if }}{{{ mocker (object property=seedProperty type='seed' scapeQuotes=false hasUuidSeed=false) }}}{{#if hasQuotation }}'{{/if}},
        {{/if}}
        {{/each}}
    },
    {{/loops}}
];