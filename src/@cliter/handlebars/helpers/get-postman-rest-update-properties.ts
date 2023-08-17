import * as handlebars from 'handlebars';
import { Property, getPostmanRestUpdateProperties } from '../..';

handlebars.registerHelper('getPostmanRestUpdateProperties', function(
    properties: Property[],
): Property[]
{
    return getPostmanRestUpdateProperties(
        properties,
    );
});
