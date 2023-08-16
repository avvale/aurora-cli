import * as handlebars from 'handlebars';
import { Property, getPostmanRestCreateProperties } from '../..';

handlebars.registerHelper('getPostmanRestCreateProperties', function(
    properties: Property[],
): Property[]
{
    return getPostmanRestCreateProperties(
        properties,
    );
});
