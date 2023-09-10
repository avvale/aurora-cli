import * as handlebars from 'handlebars';
import { Property, getMultipleSelectWebComponentsProperties } from '../..';

handlebars.registerHelper('getMultipleSelectWebComponentsProperties', function(
    properties: Property[],
): Property[]
{
    return getMultipleSelectWebComponentsProperties(
        properties,
    );
});
