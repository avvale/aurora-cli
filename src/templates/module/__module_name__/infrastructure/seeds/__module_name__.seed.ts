export const {{ toCamelCase schema.moduleNames }} = [
    {{#loops 20}}
    {
        {{#each ../schema.properties.seed as |seedProperty seedId|}}
        {{ toCamelCase seedProperty.name }}: {{#if hasQuotation }}'{{/if }}{{{ fakerProperty seedProperty }}}{{#if hasQuotation }}'{{/if }},
        {{/each}}
    },
    {{/loops}}
];