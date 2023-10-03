import * as handlebars from 'handlebars';
import { Property, hasProperties } from '../..';

handlebars.registerHelper('hasProperties', function(
    properties: Property[],
): boolean
{
    return hasProperties(
        properties,
    );
});
