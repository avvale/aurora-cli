import * as handlebars from 'handlebars';

handlebars.registerPartial('importI18nRepository',
    `{{#if (hasI18nProperties schema.aggregateProperties) }}
import { {{ toPascalCase schema.boundedContextName }}I{{ toPascalCase schema.moduleName }}I18nRepository } from '../../domain/{{ toKebabCase schema.boundedContextName }}-{{ toKebabCase schema.moduleName }}-i18n.repository';
{{/if}}`);
