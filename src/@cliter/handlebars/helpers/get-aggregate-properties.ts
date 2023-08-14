import * as handlebars from 'handlebars';
import { Property, getAggregateProperties } from '../..';

handlebars.registerHelper('getAggregateProperties', function(
    properties: Property[],
): Property[]
{
    return getAggregateProperties(properties);
});
