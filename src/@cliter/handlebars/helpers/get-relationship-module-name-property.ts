import * as handlebars from 'handlebars';
import { ModuleDefinitionSchema, Property, getRelationshipModuleName } from '../..';

handlebars.registerHelper('getRelationshipModuleName', function(
    property: Property,
    schema: ModuleDefinitionSchema,
): string | null
{
    return getRelationshipModuleName(property, schema);
});
