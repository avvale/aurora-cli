import * as handlebars from 'handlebars';
import { Property, getPostmanGraphqlFindQueryProperties } from '../..';

handlebars.registerHelper('getPostmanGraphqlFindQueryProperties', function(
    properties: Property[],
): Property[]
{
    return getPostmanGraphqlFindQueryProperties(
        properties,
    );
});
