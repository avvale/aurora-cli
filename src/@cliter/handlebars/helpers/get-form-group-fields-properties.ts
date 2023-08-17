import * as handlebars from 'handlebars';
import { Property, getFormGroupFieldsProperties } from '../..';

handlebars.registerHelper('getFormGroupFieldsProperties', function(
    properties: Property[],
): Property[]
{
    return getFormGroupFieldsProperties(
        properties,
    );
});
