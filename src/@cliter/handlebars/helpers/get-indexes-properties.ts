import * as handlebars from 'handlebars';
import { Property, getIndexesProperties } from '../..';

handlebars.registerHelper('getIndexesProperties', function(
    properties: Property[],
): Property[]
{
    return getIndexesProperties(
        properties,
    );
});
