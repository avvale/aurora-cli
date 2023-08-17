import * as handlebars from 'handlebars';
import { ModuleDefinitionSchema, Property, getSchemaFromPropertyRelationship } from '../..';

handlebars.registerHelper('getSchemaFromPropertyRelationship', function(
    property: Property,
    schema: ModuleDefinitionSchema,
): ModuleDefinitionSchema | null
{
    return getSchemaFromPropertyRelationship(
        property,
        schema,
    );
});
