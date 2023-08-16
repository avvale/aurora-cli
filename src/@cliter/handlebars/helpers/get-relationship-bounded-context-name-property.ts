import * as handlebars from 'handlebars';
import { ModuleDefinitionSchema, Property, getRelationshipBoundedContextNameProperty } from '../..';

handlebars.registerHelper('getRelationshipBoundedContextNameProperty', function(
    property: Property,
    schema: ModuleDefinitionSchema,
): string | null
{
    return getRelationshipBoundedContextNameProperty(
        property,
        schema,
    );
});
