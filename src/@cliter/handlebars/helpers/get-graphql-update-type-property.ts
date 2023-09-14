import * as handlebars from 'handlebars';
import { CliterConfig, Property, getGraphqlUpdateTypeProperty } from '../..';

handlebars.registerHelper('getGraphqlUpdateTypeProperty', function(
    property: Property,
    config: CliterConfig,
): string
{
    return getGraphqlUpdateTypeProperty(
        property,
        config,
    );
});
