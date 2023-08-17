import * as handlebars from 'handlebars';
import { CliterConfig, ModuleDefinitionSchema, Property, getGraphqlUpdateTypeProperty } from '../..';

handlebars.registerHelper('getGraphqlUpdateTypeProperty', function(
    property: Property,
    config: CliterConfig,
    schema: ModuleDefinitionSchema,
): string
{
    return getGraphqlUpdateTypeProperty(
        property,
        config,
        schema,
    );
});
