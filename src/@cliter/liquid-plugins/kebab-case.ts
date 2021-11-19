import { Liquid } from 'liquidjs';
import * as _ from 'lodash';

export function kebabCase(engine: Liquid): void
{
    engine.registerFilter('kebabCase', value => _.kebabCase(value));
}