import * as handlebars from 'handlebars';
import { Property, getGridFieldsProperties } from '../..';

handlebars.registerHelper('getGridFieldsProperties', function(
    properties: Property[],
): Property[]
{
    return getGridFieldsProperties(
        properties,
    );
});
