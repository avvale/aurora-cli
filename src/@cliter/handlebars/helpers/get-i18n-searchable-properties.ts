import * as handlebars from 'handlebars';
import { Property, getI18nSearchableProperties } from '../..';

handlebars.registerHelper('getI18nSearchableProperties', function(
    properties: Property[],
    avoid: string[] = [],
): Property[]
{
    return getI18nSearchableProperties(
        properties,
        avoid,
    );
});
