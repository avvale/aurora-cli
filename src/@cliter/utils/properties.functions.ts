import { RelationshipType } from '../types';
import { Property } from './property';

/********************
 * PROPERTIES CONST *
 ********************/
export const timestampProperties: string[] = ['createdAt', 'updatedAt', 'deletedAt'];
export const deletedAtProperty: string[] = ['deletedAt'];

// replace by Properties hasI18n
export const hasI18nProperties = (properties: Property[]): boolean =>
{
    return properties.some(property => property.isI18n);
};

/**********************
 * PROPERTIES FILTERS *
 **********************/
// replace by Properties valueObjects
export const getValueObjectsProperties = (properties: Property[]): Property[] =>
{
    return properties
        .filter(property => property.relationship?.type !== RelationshipType.ONE_TO_MANY)                                    // exclude one to many relations
        .filter(property => !(property.relationship?.type === RelationshipType.ONE_TO_ONE && !property.relationship?.field)); // exclude one to many relations
};

// replace by Properties withRelationshipManyToMany
export const getRelationshipManyToManyProperties = (properties: Property[]): Property[] =>
{
    return properties.filter(property => property.relationship?.type === RelationshipType.MANY_TO_MANY);
};

// replace by Properties withRelationship
export const getRelationshipProperties = (properties: Property[]): Property[] =>
{
    return properties.filter(property => Boolean(property.relationship));
};

// replace by Properties getForeignRelationship
export const getForeignRelationshipProperties = (properties: Property[], boundedContextName: string): Property[] =>
{
    return getRelationshipProperties(properties)
        .filter(item =>
        {
            if (!item.relationship?.modulePath) return false;
            return item.relationship?.modulePath.split('/')[0] !== boundedContextName;
        });
};

// replace by Properties withoutTimestamps
export const getWithoutTimestampsProperties = (properties: Property[]): Property[] =>
{
    return properties.filter(property => !timestampProperties.includes(property.name));
};

// replace by Properties aggregate
export const getAggregateProperties = (properties: Property[]): Property[] =>
{
    return properties
        .filter(property => property.relationship?.type !== RelationshipType.ONE_TO_MANY)                                     // exclude one to many relations
        .filter(property => !(property.relationship?.type === RelationshipType.ONE_TO_ONE && !property.relationship?.field)); // exclude one to one relations without relationship?.field, is relation one to one without xxxxId
};

// replace by Properties createService
export const getCreateServiceProperties = (properties: Property[], moduleName: string): Property[] =>
{
    return properties
        .filter(property => !timestampProperties.includes(property.name))                                                               // exclude timestamps
        .filter(property => property.relationship?.type !== RelationshipType.ONE_TO_MANY)                                               // exclude one to many relations
        .filter(property => !(property.relationship?.type === RelationshipType.ONE_TO_ONE && !property.relationship?.field))            // exclude one to one relations without relationship field, is relation one to one without xxxxId
        .filter(property => !property.isI18n || (property.isI18n && property.name !== 'id'))                                            // exclude id of i18n table
        .filter(property => !property.isI18n || (property.isI18n && property.name !== moduleName.toCamelCase() + 'Id'))                 // exclude relationship id of i18n table
        .filter(property => !hasI18nProperties(properties) || (hasI18nProperties(properties) && property.name !== 'availableLangs'));   // exclude availableLangs if has i18n table
};

// replace by Properties createController
export const getCreateControllerProperties = (properties: Property[], moduleName: string): Property[] =>
{
    return properties
        .filter(property => !timestampProperties.includes(property.name))                                                               // exclude timestamps
        .filter(property => property.relationship?.type !== RelationshipType.ONE_TO_MANY)                                               // exclude one to many relations
        .filter(property => !(property.relationship?.type === RelationshipType.ONE_TO_ONE && !property.relationship?.field))            // exclude one to one relations without relationship field, is relation one to one without xxxxId
        .filter(property => !property.isI18n || (property.isI18n && property.name !== 'id'))                                            // exclude id of i18n table
        .filter(property => !property.isI18n || (property.isI18n && property.name !== moduleName.toCamelCase() + 'Id'))                 // exclude relationship id of i18n table
        .filter(property => !hasI18nProperties(properties) || (hasI18nProperties(properties) && property.name !== 'availableLangs'));   // exclude availableLangs if has i18n table
}

/***********
 * GRAPHQL *
 ***********/
// replace by Properties graphqlProperties
export const getGraphqlProperties = (properties: Property[]): Property[] =>
{
    return properties;
};

// replace by Properties graphqlInputProperties
export const getGraphqlInputProperties = (properties: Property[]): Property[] =>
{
    return [];
    return properties
        .filter(property => !timestampProperties.includes(property.name)); // exclude timestamps
};
