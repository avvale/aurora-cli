import * as handlebars from 'handlebars';
import { Property, getPostmanGraphqlUpdateVariablesProperties } from '../..';

handlebars.registerHelper('getPostmanGraphqlUpdateVariablesProperties', function(
    properties: Property[],
    moduleName: string,
): Property[]
{
    return getPostmanGraphqlUpdateVariablesProperties(
        properties,
        moduleName,
    );
});
