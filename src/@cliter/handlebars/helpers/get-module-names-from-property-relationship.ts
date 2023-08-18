import * as handlebars from 'handlebars';
import { ModuleDefinitionSchema, Property, getModuleNamesFromPropertyRelationship } from '../..';

handlebars.registerHelper('getModuleNamesFromPropertyRelationship', function(
    property: Property,
    schema: ModuleDefinitionSchema,
): string | null
{
    return getModuleNamesFromPropertyRelationship(
        property,
        schema,
    );
});
