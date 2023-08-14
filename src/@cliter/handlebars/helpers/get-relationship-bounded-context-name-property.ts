import * as handlebars from 'handlebars';
import { ModuleDefinitionSchema, Property, getRelationshipBoundedContextName } from '../..';

handlebars.registerHelper('getRelationshipBoundedContextName', function(
    property: Property,
    schema: ModuleDefinitionSchema,
): string | null
{
    return getRelationshipBoundedContextName(property, schema);
});
