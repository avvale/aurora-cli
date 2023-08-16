import * as handlebars from 'handlebars';
import { Property, getUpsertCommandProperties } from '../..';

handlebars.registerHelper('getUpsertCommandProperties', function(
    properties: Property[],
): Property[]
{
    return getUpsertCommandProperties(
        properties,
    );
});
