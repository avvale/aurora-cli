import * as handlebars from 'handlebars';
import { ModuleDefinitionSchema, Property, getRelationshipModuleNames } from '../..';

handlebars.registerHelper('getRelationshipModuleNames', function(
    property: Property,
    schema: ModuleDefinitionSchema,
): string | null
{
    return getRelationshipModuleNames(property, schema);
});
