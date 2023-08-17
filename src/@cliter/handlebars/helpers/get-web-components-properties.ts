import * as handlebars from 'handlebars';
import { Property, getWebComponentsProperties } from '../..';

handlebars.registerHelper('getWebComponentsProperties', function(
    properties: Property[],
): Property[]
{
    return getWebComponentsProperties(
        properties,
    );
});
