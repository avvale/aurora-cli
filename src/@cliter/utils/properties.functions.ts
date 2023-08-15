import { PropertyType, RelationshipType } from '../types';
import { Property } from './property';

/*********
 * CONST *
 *********/
export const timestampProperties: string[] = ['createdAt', 'updatedAt', 'deletedAt'];
export const deletedAtProperty: string[] = ['deletedAt'];

/**************
 * PROPERTIES *
 **************/
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
export const getRelationshipManyToManyProperties = (
    properties: Property[],
): Property[] =>
{
    return properties.filter(property => property.relationship?.type === RelationshipType.MANY_TO_MANY);
};

// replace by Properties withoutTimestamps
export const getWithoutTimestampsProperties = (properties: Property[]): Property[] =>
{
    return properties.filter(property => !timestampProperties.includes(property.name));
};

/*************
 * AGGREGATE *
 *************/
// replace by Properties aggregate
export const getAggregateProperties = (properties: Property[]): Property[] =>
{
    return properties
        .filter(property => property.relationship?.type !== RelationshipType.ONE_TO_MANY)                                     // exclude one to many relations
        .filter(property => !(property.relationship?.type === RelationshipType.ONE_TO_ONE && !property.relationship?.field)); // exclude one to one relations without relationship?.field, is relation one to one without xxxxId
};

/****************
 * RELATIONSHIP *
 ****************/
// replace by Properties withRelationship
export const getRelationshipProperties = (properties: Property[]): Property[] =>
{
    return properties.filter(property => Boolean(property.relationship));
};

// replace by Properties getForeignRelationship
export const getForeignRelationshipProperties = (
    properties: Property[],
    boundedContextName: string,
): Property[] =>
{
    return getRelationshipProperties(properties)
        .filter(item =>
        {
            if (!item.relationship?.modulePath) return false;
            return item.relationship?.modulePath.split('/')[0] !== boundedContextName;
        });
};

/***************
 * CONTROLLERS *
 ***************/
// replace by Properties createController
export const getCreateControllerProperties = (
    properties: Property[],
    moduleName: string,
): Property[] =>
{
    return properties
        .filter(property => !timestampProperties.includes(property.name))                                                               // exclude timestamps
        .filter(property => property.relationship?.type !== RelationshipType.ONE_TO_MANY)                                               // exclude one to many relations
        .filter(property => !(property.relationship?.type === RelationshipType.ONE_TO_ONE && !property.relationship?.field))            // exclude one to one relations without relationship field, is relation one to one without xxxxId
        .filter(property => !property.isI18n || (property.isI18n && property.name !== 'id'))                                            // exclude id of i18n table
        .filter(property => !property.isI18n || (property.isI18n && property.name !== moduleName.toCamelCase() + 'Id'))                 // exclude relationship id of i18n table
        .filter(property => !hasI18nProperties(properties) || (hasI18nProperties(properties) && property.name !== 'availableLangs'));   // exclude availableLangs if has i18n table
};

// replace by Properties updateController
export const getUpdateControllerProperties = (
    properties: Property[],
    moduleName: string,
): Property[] =>
{
    return properties
        .filter(property => !timestampProperties.includes(property.name))                                                               // exclude timestamps
        .filter(property => property.relationship?.type !== RelationshipType.ONE_TO_MANY)                                               // exclude one to many relations
        .filter(property => !(property.relationship?.type === RelationshipType.ONE_TO_ONE && !property.relationship?.field))            // exclude one to one relations without relationship field, is relation one to one without xxxxId
        .filter(property => !property.isI18n || (property.isI18n && property.name !== 'id'))                                            // exclude id of i18n table
        .filter(property => !property.isI18n || (property.isI18n && property.name !== moduleName.toCamelCase() + 'Id'))                 // exclude relationship id of i18n table
        .filter(property => !hasI18nProperties(properties) || (hasI18nProperties(properties) && property.name !== 'availableLangs'));   // exclude availableLangs if has i18n table
};

/************
 * SERVICES *
 ************/
// replace by Properties createService
export const getCreateServiceProperties = (
    properties: Property[],
    moduleName: string,
): Property[] =>
{
    return properties
        .filter(property => !timestampProperties.includes(property.name))                                                               // exclude timestamps
        .filter(property => property.relationship?.type !== RelationshipType.ONE_TO_MANY)                                               // exclude one to many relations
        .filter(property => !(property.relationship?.type === RelationshipType.ONE_TO_ONE && !property.relationship?.field))            // exclude one to one relations without relationship field, is relation one to one without xxxxId
        .filter(property => !property.isI18n || (property.isI18n && property.name !== 'id'))                                            // exclude id of i18n table
        .filter(property => !property.isI18n || (property.isI18n && property.name !== moduleName.toCamelCase() + 'Id'))                 // exclude relationship id of i18n table
        .filter(property => !hasI18nProperties(properties) || (hasI18nProperties(properties) && property.name !== 'availableLangs'));   // exclude availableLangs if has i18n table
};

// replace by Properties createItemsService
export const getCreateItemsServiceProperties = (
    properties: Property[],
    moduleName: string,
): Property[] =>
{
    return properties
        .filter(property => !timestampProperties.includes(property.name))                                                           // exclude timestamps
        .filter(property => property.relationship?.type !== RelationshipType.ONE_TO_MANY)                                           // exclude one to many relations
        .filter(property => !(property.relationship?.type === RelationshipType.ONE_TO_ONE && !property.relationship?.field))        // exclude one to one relations without relationship field, is relation one to one without xxxxId
        .filter(property => !property.isI18n || (property.isI18n && property.name !== 'id'))                                        // exclude id of i18n table
        .filter(property => !property.isI18n || (property.isI18n && property.name !== moduleName.toCamelCase() + 'Id'));            // exclude relationship id of i18n table
};

/********************
 * COMMAND HANDLERS *
 ********************/
// replace by Properties createCommandHandler
export const getCreateCommandHandlerProperties = (
    properties: Property[],
): Property[] =>
{
    return properties
        .filter(property => !timestampProperties.includes(property.name))                                                     // exclude timestamps
        .filter(property => property.relationship?.type !== RelationshipType.ONE_TO_MANY)                                     // exclude one to many relations
        .filter(property => !(property.relationship?.type === RelationshipType.ONE_TO_ONE && !property.relationship?.field)); // exclude one to one relations without relationship?.field, is relation one to one without xxxxId
};

// replace by Properties updateCommandHandler
export const getUpdateCommandHandlerProperties = (
    properties: Property[],
): Property[] =>
{
    return properties
        .filter(property => !timestampProperties.includes(property.name))                                                     // exclude timestamps
        .filter(property => property.relationship?.type !== RelationshipType.ONE_TO_MANY)                                     // exclude one to many relations
        .filter(property => !(property.relationship?.type === RelationshipType.ONE_TO_ONE && !property.relationship?.field)); // exclude one to one relations without relationship?.field, is relation one to one without xxxxId
};

// replace by Properties upsertCommandHandler
export const getUpsertCommandHandlerProperties = (
    properties: Property[],
): Property[] =>
{
    return properties
        .filter(property => !timestampProperties.includes(property.name))                                                     // exclude timestamps
        .filter(property => property.relationship?.type !== RelationshipType.ONE_TO_MANY)                                     // exclude one to many relations
        .filter(property => !(property.relationship?.type === RelationshipType.ONE_TO_ONE && !property.relationship?.field)); // exclude one to one relations without relationship?.field, is relation one to one without xxxxId
};

// replace by Properties withImportRelationshipManyToMany
export const getWithImportRelationshipManyToManyProperties = (properties: Property[]): Property[] =>
{
    return properties
        // avoid duplicate self relations
        .filter((value, index, self) => index === self.findIndex(t => (t.relationship?.modulePath === value.relationship?.modulePath && t.relationship?.aggregateName === value.relationship?.aggregateName)))
        .filter(property => property.relationship?.type === RelationshipType.MANY_TO_MANY);
};

// replace by Properties isEnum
export const getEnumProperties = (properties: Property[]): Property[] =>
{
    return properties.filter(property => property.type === PropertyType.ENUM);
};

/************
 * COMMANDS *
 ************/
// replace by Properties createCommand
export const getCreateCommandProperties = (
    properties: Property[],
): Property[] =>
{
    return properties
        .filter(property => !timestampProperties.includes(property.name))                                                     // exclude timestamps
        .filter(property => property.relationship?.type !== RelationshipType.ONE_TO_MANY)                                     // exclude one to many relations
        .filter(property => !(property.relationship?.type === RelationshipType.ONE_TO_ONE && !property.relationship?.field)); // exclude one to one relations without relationship?.field, is relation one to one without xxxxId
};

// replace by Properties updateCommand
export const getUpdateCommandProperties = (
    properties: Property[],
): Property[] =>
{
    return properties
        .filter(property => !timestampProperties.includes(property.name))                                                      // exclude timestamps
        .filter(property => property.relationship?.type !== RelationshipType.ONE_TO_MANY)                                       // exclude one to many relations
        .filter(property => !(property.relationship?.type === RelationshipType.ONE_TO_ONE && !property.relationship?.field));   // exclude one to one relations without relationship?.field, is relation one to one without xxxxId
};

// replace by Properties upsertCommand
export const getUpsertCommandProperties = (
    properties: Property[],
): Property[] =>
{
    return properties
        .filter(property => !timestampProperties.includes(property.name))                                                    // exclude timestamps
        .filter(property => property.relationship?.type !== RelationshipType.ONE_TO_MANY)                                     // exclude one to many relations
        .filter(property => !(property.relationship?.type === RelationshipType.ONE_TO_ONE && !property.relationship?.field)); // exclude one to one relations without relationship?.field, is relation one to one without xxxxId
};

/**********
 * EVENTS *
 **********/
// replace by Properties createdEvent
export const getCreatedEventProperties = (properties: Property[]): Property[] =>
{
    return properties
        .filter(property => property.relationship?.type !== RelationshipType.ONE_TO_MANY)                                     // exclude one to many relations
        .filter(property => !(property.relationship?.type === RelationshipType.ONE_TO_ONE && !property.relationship?.field)); // exclude one to one relations without relationship field, is relation one to one without xxxxId
};

// replace by Properties updatedEvent
export const getUpdatedEventProperties = (properties: Property[]): Property[] =>
{
    return properties
        .filter(property => property.relationship?.type !== RelationshipType.ONE_TO_MANY)                                     // exclude one to many relations
        .filter(property => !(property.relationship?.type === RelationshipType.ONE_TO_ONE && !property.relationship?.field)); // exclude one to one relations without relationship field, is relation one to one without xxxxId
};

// replace by Properties deletedEvent
export const getDeletedEventProperties = (properties: Property[]): Property[] =>
{
    return properties
        .filter(property => property.relationship?.type !== RelationshipType.ONE_TO_MANY)                                     // exclude one to many relations
        .filter(property => !(property.relationship?.type === RelationshipType.ONE_TO_ONE && !property.relationship?.field)); // exclude one to one relations without relationship  field, is relation one to one without xxxxId
};

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
    return properties
        .filter(property => !timestampProperties.includes(property.name)); // exclude timestamps
};

/********
 * REST *
 ********/
// replace by Properties dtoProperties
export const getDtoProperties = (properties: Property[]): Property[] =>
{
    return properties;
};

// replace by Properties dtoInputProperties
export const gerDtoInputProperties = (properties: Property[]): Property[] =>
{
    return properties
        .filter(property => !timestampProperties.includes(property.name)); // exclude timestamps
};
