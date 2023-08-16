import * as handlebars from 'handlebars';
import { ModuleDefinitionSchema, Property, getRelationshipModuleNameProperty } from '../..';

handlebars.registerHelper('getRelationshipModuleNameProperty', function(
    property: Property,
    schema: ModuleDefinitionSchema,
): string | null
{
    return getRelationshipModuleNameProperty(
        property,
        schema,
    );
});
