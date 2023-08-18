import * as handlebars from 'handlebars';
import { ModuleDefinitionSchema, Property, getBoundedContextNameFromPropertyRelationship } from '../..';

handlebars.registerHelper('getBoundedContextNameFromPropertyRelationship', function(
    property: Property,
    schema: ModuleDefinitionSchema,
): string | null
{
    return getBoundedContextNameFromPropertyRelationship(
        property,
        schema,
    );
});
