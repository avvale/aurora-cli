import * as handlebars from 'handlebars';
import { ModuleDefinitionSchema, Property, getModuleNameFromPropertyRelationship } from '../..';

handlebars.registerHelper('getModuleNameFromPropertyRelationship', function(
    property: Property,
    schema: ModuleDefinitionSchema,
): string | null
{
    return getModuleNameFromPropertyRelationship(
        property,
        schema,
    );
});
