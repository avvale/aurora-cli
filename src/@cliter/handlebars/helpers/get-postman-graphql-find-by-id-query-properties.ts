import * as handlebars from 'handlebars';
import { Property, getPostmanGraphqlFindByIdQueryProperties } from '../..';

handlebars.registerHelper('getPostmanGraphqlFindByIdQueryProperties', function(
    properties: Property[],
): Property[]
{
    return getPostmanGraphqlFindByIdQueryProperties(
        properties,
    );
});
