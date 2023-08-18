import * as handlebars from 'handlebars';
import { Property, countProperties } from '../..';

handlebars.registerHelper('countProperties', function(
    properties: Property[],
    moduleName: string,
): Property[]
{
    return countProperties(
        properties,
        moduleName,
    );
});
