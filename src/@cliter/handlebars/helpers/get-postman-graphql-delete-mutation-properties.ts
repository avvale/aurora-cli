import * as handlebars from 'handlebars';
import { Property, getPostmanGraphqlDeleteMutationProperties } from '../..';

handlebars.registerHelper('getPostmanGraphqlDeleteMutationProperties', function(
    properties: Property[],
): Property[]
{
    return getPostmanGraphqlDeleteMutationProperties(
        properties,
    );
});
