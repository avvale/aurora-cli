import * as handlebars from 'handlebars';
import { Property, getGraphqlProperties } from '../..';

handlebars.registerHelper('getGraphqlProperties', function(
    properties: Property[],
): Property[]
{
    return getGraphqlProperties(
        properties,
    );
});
