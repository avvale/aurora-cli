import * as handlebars from 'handlebars';
import { Property, hasBooleanProperties } from '../..';

handlebars.registerHelper('hasBooleanProperties', function(
    properties: Property[],
): boolean
{
    return hasBooleanProperties(
        properties,
    );
});
