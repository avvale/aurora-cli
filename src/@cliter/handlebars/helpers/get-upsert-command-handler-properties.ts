import * as handlebars from 'handlebars';
import { Property, getUpsertCommandHandlerProperties } from '../..';

handlebars.registerHelper('getUpsertCommandHandlerProperties', function(
    properties: Property[],
): Property[]
{
    return getUpsertCommandHandlerProperties(
        properties,
    );
});
