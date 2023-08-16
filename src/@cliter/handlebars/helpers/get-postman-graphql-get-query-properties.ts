import * as handlebars from 'handlebars';
import { Property, getPostmanGraphqlGetQueryProperties } from '../..';

handlebars.registerHelper('getPostmanGraphqlGetQueryProperties', function(
    properties: Property[],
): Property[]
{
    return getPostmanGraphqlGetQueryProperties(
        properties,
    );
});
