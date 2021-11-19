import { Liquid } from 'liquidjs';
import * as _ from 'lodash';

export function pascalCase(engine: Liquid): void
{
    engine.registerFilter('pascalCase', value =>
    {
        _.mixin({ 'pascalCase': _.flow(_.camelCase, _.upperFirst) });
        return _.pascalCase(value);
    });
}