import * as handlebars from 'handlebars';
import { Property, getPostmanGraphqlCreateVariablesProperties } from '../..';

handlebars.registerHelper('getPostmanGraphqlCreateVariablesProperties', function(
    properties: Property[],
    moduleName: string,
): Property[]
{
    return getPostmanGraphqlCreateVariablesProperties(
        properties,
        moduleName,
    );
});
