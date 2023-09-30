import * as handlebars from 'handlebars';
import { Property, hasDateProperties } from '../..';

handlebars.registerHelper('hasDateProperties', function(
    properties: Property[],
): boolean
{
    return hasDateProperties(
        properties,
    );
});
