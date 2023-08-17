import * as handlebars from 'handlebars';
import { Property, getGridElementsManagerWebComponentsProperties } from '../..';

handlebars.registerHelper('getGridElementsManagerWebComponentsProperties', function(
    properties: Property[],
): Property[]
{
    return getGridElementsManagerWebComponentsProperties(
        properties,
    );
});
