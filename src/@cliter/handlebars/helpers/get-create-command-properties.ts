import * as handlebars from 'handlebars';
import { Property, getCreateCommandProperties } from '../..';

handlebars.registerHelper('getCreateCommandProperties', function(
    properties: Property[],
): Property[]
{
    return getCreateCommandProperties(
        properties,
    );
});
