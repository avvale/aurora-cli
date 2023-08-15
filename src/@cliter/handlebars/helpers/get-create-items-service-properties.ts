import * as handlebars from 'handlebars';
import { Property, getCreateItemsServiceProperties } from '../..';

handlebars.registerHelper('getCreateItemsServiceProperties', function(
    properties: Property[],
    moduleName: string,
): Property[]
{
    return getCreateItemsServiceProperties(properties, moduleName);
});
