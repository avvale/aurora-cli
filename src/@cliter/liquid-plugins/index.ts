import { Liquid } from 'liquidjs';

// plugins
import { pascalCase } from './pascal-case';
import { kebabCase } from './kebab-case';
import { allowI18nProperty } from './allow-i18n-property';

export function liquidPlugins(engine: Liquid): void
{
    pascalCase(engine);
    kebabCase(engine);
    allowI18nProperty(engine);
}