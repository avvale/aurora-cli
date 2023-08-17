import * as handlebars from 'handlebars';
import { Property, getTestProperties } from '../..';

handlebars.registerHelper('getTestProperties', function(
    properties: Property[],
    moduleName: string,
): Property[]
{
    return getTestProperties(
        properties,
        moduleName,
    );
});
