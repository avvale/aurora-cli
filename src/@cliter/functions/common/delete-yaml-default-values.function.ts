import { ModuleDefinitionSchema, PropertyType, RelationshipType } from '../..';

export const deleteYamlDefaultValues = (schema: ModuleDefinitionSchema): ModuleDefinitionSchema =>
{
    // set length default value fot id properties
    for (const property of schema.aggregateProperties)
    {
        if (
            property.type === PropertyType.ID &&
            property.length === 36
        )
        {
            delete property.length;
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
                    pivotProperty.length === 36
                )
                {
                    delete pivotProperty.length;
                }
            }
        }
    }

    return schema;
};
