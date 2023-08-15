import { CliterConfig } from '../config';
import { ModuleDefinitionSchema, PropertyType, RelationshipType } from '../types';
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
export const getRelationshipBoundedContextNameProperty = (
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
        throwRelationshipEntityNorCreatedProperty(
            property,
            schema.boundedContextName,
            schema.moduleName,
        );
    }

    return null;
};

// replace by Property getRelationshipModuleName
export const getRelationshipModuleNameProperty = (
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
        throwRelationshipEntityNorCreatedProperty(
            property,
            schema.boundedContextName,
            schema.moduleName,
        );
    }

    return null;
};

// replace by Property getRelationshipModuleNames
export const getRelationshipModuleNamesProperty = (
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
        throwRelationshipEntityNorCreatedProperty(
            property,
            schema.boundedContextName,
            schema.moduleName,
        );
    }

    return null;
};

// replace by Property throwRelationshipEntityNorCreated
export const throwRelationshipEntityNorCreatedProperty = (
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

/********
 * REST *
 ********/
// replace by Property getSwaggerType
export const getSwaggerTypeProperty = (
    property: Property,
    config: CliterConfig,
): string =>
{
    return config.propertyTypesEquivalenceSwaggerTypes[property.type];
};

// replace by Property getDtoType
export const getDtoTypeProperty = (
    property: Property,
    config: CliterConfig,
): string =>
{
    return config.propertyTypesEquivalenceDtoTypes[property.type];
};

/***********
 * GraphQL *
 ***********/
// replace by Property getGraphqlType
export const getGraphqlTypeProperty = (
    property: Property,
    config: CliterConfig,
): string | undefined =>
{
    if (property.relationship?.type === RelationshipType.ONE_TO_MANY || property.relationship?.type === RelationshipType.MANY_TO_MANY)  return `[${property.relationship?.aggregateName}]`;
    if (property.relationship?.type === RelationshipType.MANY_TO_ONE)                                                                   return `${property.relationship?.aggregateName}`;
    if (property.relationship?.type === RelationshipType.ONE_TO_ONE)                                                                    return `${property.relationship?.aggregateName}`;
    return config.propertyTypesEquivalenceQraphqlTypes[property.type];
};

// replace by Property getGraphqlCreateType
export const getGraphqlCreateTypeProperty = (
    property: Property,
    config: CliterConfig,
    schema: ModuleDefinitionSchema,
): string =>
{
    if (property.relationship?.type === RelationshipType.MANY_TO_MANY)                                  return config.propertyTypesEquivalenceQraphqlTypes.manyToMany;
    if (property.relationship?.type === RelationshipType.ONE_TO_ONE && !property.relationship.field)    return `${getRelationshipBoundedContextNameProperty(property, schema)?.toPascalCase()}Create${getRelationshipModuleNameProperty(property, schema)?.toPascalCase()}Input`;
    return config.propertyTypesEquivalenceQraphqlTypes[property.type];
};

// replace by Property getGraphqlUpdateType
export const getGraphqlUpdateTypeProperty = (
    property: Property,
    config: CliterConfig,
    schema: ModuleDefinitionSchema,
): string =>
{
    if (property.relationship?.type === RelationshipType.MANY_TO_MANY)                                  return config.propertyTypesEquivalenceQraphqlTypes.manyToMany;
    if (property.relationship?.type === RelationshipType.ONE_TO_ONE && !property.relationship.field)    return `${getRelationshipBoundedContextNameProperty(property, schema)?.toPascalCase()}Update${getRelationshipModuleNameProperty(property, schema)?.toPascalCase()}Input`;
    return config.propertyTypesEquivalenceQraphqlTypes[property.type];
};

// replace by Property getJavascriptType
export const getJavascriptTypeProperty = (
    property: Property,
    config: CliterConfig,
): string =>
{
    if (property.relationship?.type === RelationshipType.MANY_TO_MANY)    return config.propertyTypesEquivalenceJavascriptTypes.manyToMany;
    if (property.type === PropertyType.RELATIONSHIP)                    return `${property.relationship?.aggregateName}[]`;

    return config.propertyTypesEquivalenceJavascriptTypes[property.type];
}