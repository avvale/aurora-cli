import * as handlebars from 'handlebars';
import { Property, getCreateServiceProperties } from '../..';

handlebars.registerHelper('getCreateServiceProperties', function(
    properties: Property[],
    moduleName: string,
): Property[]
{
    return getCreateServiceProperties(properties, moduleName);
});
