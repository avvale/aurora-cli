import * as handlebars from 'handlebars';
handlebars.registerPartial('importValueObjects',
    `{{#each schema.properties.valueObjects}}
{{#if (allowProperty ../schema.moduleName this) }}
{{ toPascalCase ../schema.moduleName }}{{> i18n }}{{ toPascalCase name }},
{{/if}}
{{/each}}`);