import * as handlebars from 'handlebars';
import { Property, hasTimestampProperties } from '../..';

handlebars.registerHelper('hasTimestampProperties', function(
    properties: Property[],
): boolean
{
    return hasTimestampProperties(
        properties,
    );
});
