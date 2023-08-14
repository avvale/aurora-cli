import * as handlebars from 'handlebars';
import { Property, getGraphqlInputProperties } from '../..';

handlebars.registerHelper('getGraphqlInputProperties', function(
    properties: Property[],
): Property[]
{
    return getGraphqlInputProperties(properties);
});
