import { Liquid } from 'liquidjs';
import { Property } from './../utils/property';
import * as _ from 'lodash';

export function allowI18nProperty(engine: Liquid): void
{
    engine.registerFilter('allowI18nProperty', (properties: Property[], moduleName: string) => properties.filter(property =>
    {
        return property.name !== 'id'
        && property.name !== _.camelCase(moduleName) + 'Id'
        && property.name !== 'createdAt'
        && property.name !== 'updatedAt'
        && property.name !== 'deletedAt';

    }));
}