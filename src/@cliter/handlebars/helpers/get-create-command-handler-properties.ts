import * as handlebars from 'handlebars';
import { Property, getCreateCommandHandlerProperties } from '../..';

handlebars.registerHelper('getCreateCommandHandlerProperties', function(
    properties: Property[],
): Property[]
{
    return getCreateCommandHandlerProperties(
        properties,
    );
});
