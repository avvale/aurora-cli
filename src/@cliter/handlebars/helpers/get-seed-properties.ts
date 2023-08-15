import * as handlebars from 'handlebars';
import { Property, getSeedProperties } from '../..';

handlebars.registerHelper('getSeedProperties', function(
    properties: Property[],
): Property[]
{
    return getSeedProperties(properties);
});
