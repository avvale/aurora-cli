import * as handlebars from 'handlebars';
import { CliterConfig, ModuleDefinitionSchema, Property, getGraphqlCreateTypeProperty } from '../..';

handlebars.registerHelper('getGraphqlCreateTypeProperty', function(
    property: Property,
    config: CliterConfig,
    schema: ModuleDefinitionSchema,
): string
{
    return getGraphqlCreateTypeProperty(
        property,
        config,
        schema,
    );
});
