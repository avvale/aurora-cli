import * as handlebars from 'handlebars';
import { Property, getLengthProperties } from '../..';

handlebars.registerHelper('getLengthProperties', function(
    properties: Property[],
    moduleName: string,
): Property[]
{
    return getLengthProperties(
        properties,
        moduleName,
    );
});
