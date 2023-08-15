import * as handlebars from 'handlebars';
import { Property, getUpdateServiceProperties } from '../..';

handlebars.registerHelper('getUpdateServiceProperties', function(
    properties: Property[],
    moduleName: string,
): Property[]
{
    return getUpdateServiceProperties(
        properties,
        moduleName,
    );
});
