import * as handlebars from 'handlebars';
import { Property, getUpsertServiceProperties } from '../..';

handlebars.registerHelper('getUpsertServiceProperties', function(
    properties: Property[],
    moduleName: string,
): Property[]
{
    return getUpsertServiceProperties(
        properties,
        moduleName,
    );
});
