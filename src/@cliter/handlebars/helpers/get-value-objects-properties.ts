import * as handlebars from 'handlebars';
import { Property, getValueObjectsProperties } from '../..';

handlebars.registerHelper('getValueObjectsProperties', function(
    properties: Property[],
): Property[]
{
    return getValueObjectsProperties(
        properties,
    );
});
