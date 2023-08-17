import * as handlebars from 'handlebars';
import { Property, getPostmanGraphqlUpdateMutationProperties } from '../..';

handlebars.registerHelper('getPostmanGraphqlUpdateMutationProperties', function(
    properties: Property[],
): Property[]
{
    return getPostmanGraphqlUpdateMutationProperties(
        properties,
    );
});
