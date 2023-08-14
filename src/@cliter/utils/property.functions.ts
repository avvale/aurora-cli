import { ModuleDefinitionSchema, RelationshipType } from '../types';
import { Property } from './property';
import { loadYamlByBoundedContextModule } from './yaml-manager';

// replace by Property name
export const getNameProperty = (property: Property): string =>
{
    // properties that represent many to many relationships, are arrays of ids
    if (property.relationship?.type === RelationshipType.MANY_TO_MANY) return `${property.relationship.singularName}Ids`;
    return property.name;
};

// replace by Property getRelationshipBoundedContextName
export const getRelationshipBoundedContextName = (
    property: Property,
    schema: ModuleDefinitionSchema,
): string | null =>
{
    try
    {
        if (property.relationship?.modulePath) return loadYamlByBoundedContextModule(property.relationship?.modulePath).boundedContextName;
    }
    catch
    {
        throwRelationshipEntityNorCreated(
            property,
            schema.boundedContextName,
            schema.moduleName,
        );
    }

    return null;
};

// replace by Property getRelationshipModuleName
export const getRelationshipModuleName = (
    property: Property,
    schema: ModuleDefinitionSchema,
): string | null =>
{
    try
    {
        if (property.relationship?.modulePath) return loadYamlByBoundedContextModule(property.relationship?.modulePath).moduleName;
    }
    catch
    {
        throwRelationshipEntityNorCreated(
            property,
            schema.boundedContextName,
            schema.moduleName,
        );
    }

    return null;
}

// replace by Property getRelationshipModuleNames
export const getRelationshipModuleNames = (
    property: Property,
    schema: ModuleDefinitionSchema,
): string | null =>
{
    try
    {
        if (property.relationship?.modulePath) return loadYamlByBoundedContextModule(property.relationship?.modulePath).moduleNames;
    }
    catch
    {
        throwRelationshipEntityNorCreated(
            property,
            schema.boundedContextName,
            schema.moduleName,
        );
    }

    return null;
};

// replace by Property throwRelationshipEntityNorCreated
export const throwRelationshipEntityNorCreated = (
    property: Property,
    boundedContextName: string,
    moduleName: string,
): void =>
{
    throw new Error(`
Getting relationship module path for ${property.name} property.
    Path: ${property.relationship?.modulePath}
    Aggregate: ${property.relationship?.aggregateName}
    Relationship: ${property.relationship?.type}

For fields with relationship, you must previously create the yaml
of the related entity, you can do it manually or through the CLI
using the command:

aurora generate back module -n=${property.relationship?.modulePath}

And create related entity.

The yaml for the current entity has been created, regenerate
the module ${boundedContextName}/${moduleName} again when you have created the yaml
for the entity related ${property.relationship?.modulePath}, with the command:

aurora load back module -n=${boundedContextName}/${moduleName} -ft
    `);
};
