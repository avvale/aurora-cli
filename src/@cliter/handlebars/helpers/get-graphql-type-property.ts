import * as handlebars from 'handlebars';
import { CliterConfig, Property, getGraphqlTypeProperty } from '../..';

handlebars.registerHelper('getGraphqlTypeProperty', function(
    property: Property,
    config: CliterConfig,
): string | undefined
{
    return getGraphqlTypeProperty(property, config);
});
