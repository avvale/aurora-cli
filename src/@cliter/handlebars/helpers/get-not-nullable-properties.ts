import * as handlebars from 'handlebars';
import { Property, getNotNullableProperties } from '../..';

handlebars.registerHelper('getNotNullableProperties', function(
    properties: Property[],
    moduleName: string,
): Property[]
{
    return getNotNullableProperties(
        properties,
        moduleName,
    );
});
