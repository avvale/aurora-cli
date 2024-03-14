import { ModuleDefinitionSchema, PropertyType } from '../..';

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
    }

    return schema;
};
