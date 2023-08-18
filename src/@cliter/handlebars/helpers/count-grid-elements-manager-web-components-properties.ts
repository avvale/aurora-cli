import * as handlebars from 'handlebars';
import { Property, countGridElementsManagerWebComponentsProperties } from '../..';

handlebars.registerHelper('countGridElementsManagerWebComponentsProperties', function(
    properties: Property[],
): number
{
    return countGridElementsManagerWebComponentsProperties(
        properties,
    );
});
