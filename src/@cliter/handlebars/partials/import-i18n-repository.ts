import * as handlebars from 'handlebars';

handlebars.registerPartial('importI18nRepository',
    `{{#if schema.properties.hasI18n}}
import { I{{ toPascalCase schema.moduleName }}I18nRepository } from '../../domain/{{ toKebabCase schema.moduleName }}-i18n.repository';
{{/if}}`);
