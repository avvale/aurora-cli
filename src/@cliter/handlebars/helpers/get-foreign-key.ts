import * as handlebars from 'handlebars';
import { ModuleDefinitionSchema, PropertyRelationship } from '../../types';

handlebars.registerHelper('getForeignKey', function(
    {
        relationship,
        schema,
    }: {
        relationship?: PropertyRelationship;
        schema?: ModuleDefinitionSchema;
    },
    context,
)
{
    if (relationship?.key) return relationship.key;
    return `${schema?.moduleName.toCamelCase()}Id`;
});
