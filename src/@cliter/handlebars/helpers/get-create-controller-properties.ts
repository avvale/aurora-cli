import * as handlebars from 'handlebars';
import { Property, getCreateControllerProperties } from '../..';

handlebars.registerHelper('getCreateControllerProperties', function(
    properties: Property[],
    moduleName: string,
): Property[]
{
    return getCreateControllerProperties(
        properties,
        moduleName,
    );
});
