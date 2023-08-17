import * as handlebars from 'handlebars';
import { ModuleDefinitionSchema, Property, getPropertiesFromPropertyRelationship } from '../..';

handlebars.registerHelper('getPropertiesFromPropertyRelationship', function(
    property: Property,
    schema: ModuleDefinitionSchema,
): Property[] | null
{
    return getPropertiesFromPropertyRelationship(
        property,
        schema,
    );
});
