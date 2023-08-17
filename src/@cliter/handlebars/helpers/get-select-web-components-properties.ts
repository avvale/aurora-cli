import * as handlebars from 'handlebars';
import { Property, getSelectWebComponentsProperties } from '../..';

handlebars.registerHelper('getSelectWebComponentsProperties', function(
    properties: Property[],
): Property[]
{
    return getSelectWebComponentsProperties(
        properties,
    );
});
