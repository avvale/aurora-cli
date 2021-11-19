import { Liquid } from 'liquidjs';

// plugins
import { pascalCase } from './pascal-case';
import { kebabCase } from './kebab-case';

export function liquidPlugins(engine: Liquid): void
{
    pascalCase(engine);
    kebabCase(engine);
}