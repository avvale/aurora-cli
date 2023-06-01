import * as handlebars from 'handlebars';

handlebars.registerPartial('declareI18nRepository',
    `{{#if schema.properties.hasI18n}}
private readonly repositoryI18n: I{{ toPascalCase schema.moduleName }}I18nRepository,
{{/if}}`);
