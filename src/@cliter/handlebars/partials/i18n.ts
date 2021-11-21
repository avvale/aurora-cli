import * as handlebars from 'handlebars';
handlebars.registerPartial('i18n', '{{#if isI18n}}I18N{{/if}}');