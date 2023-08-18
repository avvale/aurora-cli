import * as handlebars from 'handlebars';
import { ModuleDefinitionSchema, Property, getRelationshipModuleNamesProperty } from '../..';

handlebars.registerHelper('getRelationshipModuleNamesProperty', function(
    property: Property,
    schema: ModuleDefinitionSchema,
): string | null
{
    return getRelationshipModuleNamesProperty(
        property,
        schema,
    );
});
