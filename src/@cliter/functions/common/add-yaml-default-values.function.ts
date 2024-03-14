import { ModuleDefinitionSchema, PropertyType } from '../..';

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
    }

    return schema;
};
