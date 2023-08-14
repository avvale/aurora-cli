import { RelationshipType } from '../types';
import { Property } from './property';
import { loadYamlByBoundedContextModule } from './yaml-manager';

// replace by Property name
export const getNameProperty = (property: Property): string =>
{
    // properties that represent many to many relationships, are arrays of ids
    if (property.relationship?.type === RelationshipType.MANY_TO_MANY) return `${property.relationship.singularName}Ids`;
    return property.name;
};

// replace by Property (getRelationshipBoundedContextName this)
export const getRelationshipBoundedContextName = (property: Property): string | null =>
{
    try
    {
        if (property.relationship?.modulePath) return loadYamlByBoundedContextModule(property.relationship?.modulePath).boundedContextName;
    }
    catch
    {
        throwRelationshipEntityNorCreated(property);
    }

    return null;
};

// TODO, obtener datos de schema de esta propiedad
// replace by Property throwRelationshipEntityNorCreated
export const throwRelationshipEntityNorCreated = (property: Property): void =>
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
the module ${property.schema?.boundedContextName}/${property.schema?.moduleName} again when you have created the yaml
for the entity related ${property.relationship?.modulePath}, with the command:

aurora load back module -n=${property.schema?.boundedContextName}/${property.schema?.moduleName} -ft
    `);
};
