import * as handlebars from 'handlebars';

handlebars.registerPartial('importValueObjects',
    `{{#each (getValueObjectsProperties schema.aggregateProperties) }}
{{#if (isAllowProperty ../schema.moduleName this) }}
{{ toPascalCase ../schema.boundedContextName }}{{ toPascalCase ../schema.moduleName }}{{> i18n }}{{ toPascalCase (getPropertyName this) }},
{{/if}}
{{/each}}`);
