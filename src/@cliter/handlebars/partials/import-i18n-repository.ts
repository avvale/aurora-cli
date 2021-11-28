import * as handlebars from 'handlebars';
handlebars.registerPartial('importI18NRepository',
    `{{#if schema.properties.hasI18n}}
import { I{{ toPascalCase schema.moduleName }}I18NRepository } from './../../domain/{{ toKebabCase schema.moduleName }}-i18n.repository';
{{/if}}`);