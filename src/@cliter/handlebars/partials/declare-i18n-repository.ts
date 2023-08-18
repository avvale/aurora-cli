import * as handlebars from 'handlebars';

handlebars.registerPartial('declareI18nRepository',
    `{{#if (hasI18nProperties schema.aggregateProperties) }}
private readonly repositoryI18n: {{ toPascalCase schema.boundedContextName }}I{{ toPascalCase schema.moduleName }}I18nRepository,
{{/if}}`);
