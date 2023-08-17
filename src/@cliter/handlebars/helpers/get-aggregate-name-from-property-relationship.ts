import * as handlebars from 'handlebars';
import { ModuleDefinitionSchema, Property, getAggregateNameFromPropertyRelationship } from '../..';

handlebars.registerHelper('getAggregateNameFromPropertyRelationship', function(
    property: Property,
    schema: ModuleDefinitionSchema,
): string | null
{
    return getAggregateNameFromPropertyRelationship(
        property,
        schema,
    );
});
