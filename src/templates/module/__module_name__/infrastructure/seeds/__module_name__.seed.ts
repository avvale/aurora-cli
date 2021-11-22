export const {{ toCamelCase schema.moduleNames }} = [
    {{#loops 20}}
    {
        {{#each ../schema.properties.seed as |seedProperty seedId|}}
        {{#if (allowProperty ../schema.moduleName this)}}
        {{ toCamelCase seedProperty.name }}: {{#if hasQuotation }}'{{/if }}{{{ fakerProperty seedProperty }}}{{#if hasQuotation }}'{{/if}},
        {{/if}}
        {{/each}}
    },
    {{/loops}}
];