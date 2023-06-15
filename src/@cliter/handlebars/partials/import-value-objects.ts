import * as handlebars from 'handlebars';

handlebars.registerPartial('importValueObjects',
    `{{#each schema.properties.valueObjects}}
{{#if (isAllowProperty ../schema.moduleName this) }}
{{ toPascalCase ../schema.boundedContextName }}{{ toPascalCase ../schema.moduleName }}{{> i18n }}{{ toPascalCase name }},
{{/if}}
{{/each}}`);
