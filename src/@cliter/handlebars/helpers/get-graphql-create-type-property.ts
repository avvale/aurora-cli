import * as handlebars from 'handlebars';
import { CliterConfig, Property, getGraphqlCreateTypeProperty } from '../..';

handlebars.registerHelper('getGraphqlCreateTypeProperty', function(
    property: Property,
    config: CliterConfig,
): string
{
    return getGraphqlCreateTypeProperty(
        property,
        config,
    );
});
