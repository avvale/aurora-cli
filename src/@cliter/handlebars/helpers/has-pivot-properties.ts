import { Property, hasPivotProperties } from '../..';
import * as handlebars from 'handlebars';

handlebars.registerHelper('hasPivotProperties', function(
    properties: Property[],
): boolean
{
    return hasPivotProperties(
        properties,
    );
});
