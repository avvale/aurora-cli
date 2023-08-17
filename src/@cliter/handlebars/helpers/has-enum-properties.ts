import * as handlebars from 'handlebars';
import { Property, hasEnumProperties } from '../..';

handlebars.registerHelper('hasEnumProperties', function(
    properties: Property[],
): boolean
{
    return hasEnumProperties(
        properties,
    );
});
