import * as handlebars from 'handlebars';
import { Property, getWithoutDeletedAtProperties } from '../..';

handlebars.registerHelper('getWithoutDeletedAtProperties', function(
    properties: Property[],
): Property[]
{
    return getWithoutDeletedAtProperties(
        properties,
    );
});
