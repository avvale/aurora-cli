import * as handlebars from 'handlebars';
import { Property, getPostmanGraphqlCreateMutationProperties } from '../..';

handlebars.registerHelper('getPostmanGraphqlCreateMutationProperties', function(
    properties: Property[],
    moduleName: string,
): Property[]
{
    return getPostmanGraphqlCreateMutationProperties(
        properties,
        moduleName,
    );
});
