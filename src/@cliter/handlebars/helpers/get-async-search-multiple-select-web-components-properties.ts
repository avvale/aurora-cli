import * as handlebars from 'handlebars';
import { Property, getAsyncSearchMultipleSelectWebComponentsProperties } from '../..';

handlebars.registerHelper('getAsyncSearchMultipleSelectWebComponentsProperties', function(
    properties: Property[],
): Property[]
{
    return getAsyncSearchMultipleSelectWebComponentsProperties(
        properties,
    );
});
