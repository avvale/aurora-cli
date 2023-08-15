import * as handlebars from 'handlebars';
import { Property, getUpdateCommandProperties } from '../..';

handlebars.registerHelper('getUpdateCommandProperties', function(
    properties: Property[],
): Property[]
{
    return getUpdateCommandProperties(properties);
});
