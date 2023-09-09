import * as handlebars from 'handlebars';
import { Property, getGridSelectMultipleElementsWebComponentsProperties } from '../..';

handlebars.registerHelper('getGridSelectMultipleElementsWebComponentsProperties', function(
    properties: Property[],
): Property[]
{
    return getGridSelectMultipleElementsWebComponentsProperties(
        properties,
    );
});
