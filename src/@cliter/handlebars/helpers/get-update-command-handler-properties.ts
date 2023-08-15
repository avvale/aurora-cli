import * as handlebars from 'handlebars';
import { Property, getUpdateCommandHandlerProperties } from '../..';

handlebars.registerHelper('getUpdateCommandHandlerProperties', function(
    properties: Property[],
): Property[]
{
    return getUpdateCommandHandlerProperties(properties);
});
