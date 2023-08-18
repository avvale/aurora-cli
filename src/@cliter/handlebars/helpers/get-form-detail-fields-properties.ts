import * as handlebars from 'handlebars';
import { Property, getFormDetailFieldsProperties } from '../..';

handlebars.registerHelper('getFormDetailFieldsProperties', function(
    properties: Property[],
): Property[]
{
    return getFormDetailFieldsProperties(
        properties,
    );
});
