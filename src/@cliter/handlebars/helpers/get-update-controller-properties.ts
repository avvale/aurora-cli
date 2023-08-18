import * as handlebars from 'handlebars';
import { Property, getUpdateControllerProperties } from '../..';

handlebars.registerHelper('getUpdateControllerProperties', function(
    properties: Property[],
    moduleName: string,
): Property[]
{
    return getUpdateControllerProperties(
        properties,
        moduleName,
    );
});
