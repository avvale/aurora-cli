import { ModuleDefinitionSchema, PropertyType, RelationshipType } from '../..';

export const addYamlDefaultValues = (schema: ModuleDefinitionSchema): ModuleDefinitionSchema =>
{
    // set length default value fot id properties
    for (const property of schema.aggregateProperties)
    {
        if (
            property.type === PropertyType.ID &&
            property.length === undefined
        )
        {
            property.length = 36;
        }

        if (
            property.type === PropertyType.RELATIONSHIP &&
            property.relationship?.type === RelationshipType.MANY_TO_MANY &&
            property.relationship.pivot?.aggregateProperties &&
            Array.isArray(property.relationship.pivot.aggregateProperties)
        )
        {
            for (const pivotProperty of property.relationship.pivot.aggregateProperties)
            {
                if (
                    pivotProperty.type === PropertyType.ID &&
                    pivotProperty.length === undefined
                )
                {
                    pivotProperty.length = 36;
                }
            }
        }
    }

    return schema;
};
