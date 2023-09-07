import { Property, PropertyIndex, PropertyType, RelationshipType, WebComponentType } from '../types';
import { isPivotProperty } from './property.functions';

/*********
 * CONST *
 *********/
export const timestampProperties: string[] = ['createdAt', 'updatedAt', 'deletedAt'];
export const deletedAtProperty: string[] = ['deletedAt'];

/**************
 * PROPERTIES *
 **************/
// replace by Properties hasEnum
export const hasEnumProperties = (
    properties: Property[],
): boolean =>
{
    return properties.some(property => property.type === PropertyType.ENUM);
};

// replace by Properties hasIndexI18n
export const hasIndexI18nProperties = (
    properties: Property[],
): boolean =>
{
    return properties.some(property => (property.index === PropertyIndex.INDEX || property.index === PropertyIndex.UNIQUE) && property.isI18n);
};

// replace by Properties withoutTimestampsWithoutRelationship
export const getWithoutTimestampsWithoutRelationshipProperties = (
    properties: Property[],
): Property[] =>
{
    return properties
        .filter(property => !timestampProperties.includes(property.name))
        .filter(property => !property.relationship);
};

// replace by Properties lengthWebComponents
export const countWebComponentsProperties = (
    properties: Property[],
): number =>
{
    return properties.filter(property => Boolean(property.webComponent?.type)).length;
};

// replace by Properties lengthSelectElementWebComponents
export const countSelectElementWebComponentsProperties = (
    properties: Property[],
): number =>
{
    return properties.filter(property => property.webComponent?.type === WebComponentType.SELECT).length;
};

// replace by Properties lengthGridSelectElementWebComponents
export const countGridSelectElementWebComponentsProperties = (
    properties: Property[],
): number =>
{
    return properties.filter(property => property.webComponent?.type === WebComponentType.GRID_SELECT_ELEMENT).length;
};

// replace by Properties lengthGridElementsManagerWebComponents
export const countGridElementsManagerWebComponentsProperties = (
    properties: Property[],
): number =>
{
    return properties.filter(property => property.webComponent?.type === WebComponentType.GRID_ELEMENTS_MANAGER).length;
};

// replace by Properties withoutDeletedAt
export const getWithoutDeletedAtProperties = (
    properties: Property[],
): Property[] =>
{
    return properties.filter(property => !deletedAtProperty.includes(property.name));
};

// replace by Properties hasI18n
export const hasI18nProperties = (
    properties: Property[],
): boolean =>
{
    return properties.some(property => property.isI18n);
};

// replace by Properties hasIndex
export const hasIndexProperties = (
    properties: Property[],
): boolean =>
{
    return properties.some(property => (property.index === PropertyIndex.INDEX || property.index === PropertyIndex.UNIQUE) && !property.isI18n);
};

// replace by Properties columnsWithIndex
export const getIndexesProperties = (
    properties: Property[],
): Property[] =>
{
    return properties.filter(property => property.index); // only properties with index defined
};

export const getPrimaryKeyProperties = (
    properties: Property[],

): Property[] =>
{
    return properties
        .filter(property => property.primaryKey) // only primary key properties
        .filter((property, index, array) => array.findIndex(originProperty => originProperty.name === property.name) == index); // avoid duplicate primary keys, i18n aurora yaml has two primary key, the id and id from i18n
};

// replace by Properties valueObjects
export const getValueObjectsProperties = (
    properties: Property[],
): Property[] =>
{
    return properties
        .filter(property => property.relationship?.type !== RelationshipType.ONE_TO_MANY)                                    // exclude one to many relations
        .filter(property => !(property.relationship?.type === RelationshipType.ONE_TO_ONE && !property.relationship?.field)); // exclude one to many relations
};

// replace by Properties withoutTimestamps
export const getWithoutTimestampsProperties = (
    properties: Property[],
): Property[] =>
{
    return properties.filter(property => !timestampProperties.includes(property.name));
};

// replace by Properties response
export const getResponseProperties = (
    properties: Property[],
): Property[] =>
{
    return properties
        .filter(property => property.relationship?.type !== RelationshipType.ONE_TO_MANY)                                     // exclude one to many relations
        .filter(property => !(property.relationship?.type === RelationshipType.ONE_TO_ONE && !property.relationship?.field)); // exclude one to many relations
};

// replace by Properties seed
export const getSeedProperties = (
    properties: Property[],
): Property[] =>
{
    return properties
        .filter(property => !timestampProperties.includes(property.name))                                                     // exclude timestamps
        .filter(property => property.relationship?.type !== RelationshipType.ONE_TO_MANY)                                     // exclude one to many relations
        .filter(property => !(property.relationship?.type === RelationshipType.ONE_TO_ONE && !property.relationship?.field)); // exclude one to one relations without relationship field, is relation one to one without xxxxId
};

// replace by Properties mapper
export const getMapperProperties = (
    properties: Property[],
): Property[] =>
{
    return properties
        .filter(property => property.relationship?.type !== RelationshipType.ONE_TO_MANY)                                     // exclude one to many relations
        .filter(property => !(property.relationship?.type === RelationshipType.ONE_TO_ONE && !property.relationship?.field)); // exclude one to one relations without relationship field, is relation one to one without xxxxId
};

// replace by Properties mock
export const getMockProperties = (
    properties: Property[],
): Property[] =>
{
    return properties
        .filter(property => property.relationship?.type !== RelationshipType.ONE_TO_MANY)                                     // exclude one to many relations
        .filter(property => !(property.relationship?.type === RelationshipType.ONE_TO_ONE && !property.relationship?.field)); // exclude one to one relations without relationship field, is relation one to one without xxxxId
};

export const hasPivotProperties = (
    properties: Property[],
): boolean =>
{
    for (const property of properties)
    {
        if (isPivotProperty(property)) return true;
    }

    return false;
};

/*************
 * AGGREGATE *
 *************/
// replace by Properties aggregate
export const getAggregateProperties = (
    properties: Property[],
): Property[] =>
{
    return properties
        .filter(property => property.relationship?.type !== RelationshipType.ONE_TO_MANY)                                     // exclude one to many relations
        .filter(property => !(property.relationship?.type === RelationshipType.ONE_TO_ONE && !property.relationship?.field)); // exclude one to one relations without relationship?.field, is relation one to one without xxxxId
};

/****************
 * RELATIONSHIP *
 ****************/
// replace by Properties withRelationship
export const getPropertiesWithRelationship = (
    properties: Property[],
): Property[] =>
{
    return properties.filter(property => Boolean(property.relationship));
};

// replace by Properties getForeignRelationship
export const getForeignRelationshipProperties = (
    properties: Property[],
    boundedContextName: string,
): Property[] =>
{
    return getPropertiesWithRelationship(properties)
        .filter(item =>
        {
            if (!item.relationship?.modulePath) return false;
            return item.relationship?.modulePath.split('/')[0] !== boundedContextName;
        });
};

// replace by Properties withRelationshipManyToMany
export const getRelationshipManyToManyProperties = (
    properties: Property[],
): Property[] =>
{
    return properties.filter(property => property.relationship?.type === RelationshipType.MANY_TO_MANY);
};

// replace by Properties withImportRelationshipOneToOne
export const getWithImportRelationshipOneToOneProperties = (
    properties: Property[],
): Property[] =>
{
    return properties
        // avoid duplicate self relations
        .filter((value, index, self) => index === self.findIndex(t => (t.relationship?.modulePath === value.relationship?.modulePath && t.relationship?.aggregateName === value.relationship?.aggregateName)))
        .filter(property => property.relationship?.type === RelationshipType.ONE_TO_ONE);
};

// replace by Properties withImportRelationshipManyToOne
export const getWithImportRelationshipManyToOneProperties = (
    properties: Property[],
): Property[] =>
{
    return properties
        // avoid duplicate self relations
        .filter((value, index, self) => index === self.findIndex(t => (t.relationship?.modulePath === value.relationship?.modulePath && t.relationship?.aggregateName === value.relationship?.aggregateName)))
        .filter(property => property.relationship?.type === RelationshipType.MANY_TO_ONE);
};

// replace by Properties withImportRelationshipOneToMany
export const getWithImportRelationshipOneToManyProperties = (
    properties: Property[],
): Property[] =>
{
    return properties
        // avoid duplicate self relations
        .filter((value, index, self) => index === self.findIndex(t => (t.relationship?.modulePath === value.relationship?.modulePath && t.relationship?.aggregateName === value.relationship?.aggregateName)))
        .filter(property => property.relationship?.type === RelationshipType.ONE_TO_MANY);
};

// replace by Properties withImportRelationshipManyToMany
export const getWithImportRelationshipManyToManyProperties = (
    properties: Property[],
): Property[] =>
{
    return properties
        // avoid duplicate self relations
        .filter((value, index, self) => index === self.findIndex(t => (t.relationship?.modulePath === value.relationship?.modulePath && t.relationship?.aggregateName === value.relationship?.aggregateName)))
        .filter(property => property.relationship?.type === RelationshipType.MANY_TO_MANY);
};

// replace by Properties withRelationshipOneToOne
export const getWithRelationshipOneToOneProperties = (
    properties: Property[],
): Property[] =>
{
    return properties.filter(property => property.relationship?.type === RelationshipType.ONE_TO_ONE);
};

// replace by Properties withRelationshipOneToOneWithRelationshipField
export const getWithRelationshipOneToOneWithRelationshipFieldProperties = (
    properties: Property[],
): Property[] =>
{
    return getWithRelationshipOneToOneProperties(properties).filter(property => Boolean(property.relationship?.field));
};

// replace by Properties withRelationshipOneToOneWithoutRelationshipField
export const getWithRelationshipOneToOneWithoutRelationshipFieldProperties = (
    properties: Property[],
): Property[] =>
{
    return getWithRelationshipOneToOneProperties(properties).filter(property => !property.relationship?.field);
};

// replace by Properties withRelationshipManyToOne
export const getWithRelationshipManyToOneProperties = (
    properties: Property[],
): Property[] =>
{
    return properties.filter(property => property.relationship?.type === RelationshipType.MANY_TO_ONE);
};

// replace by Properties withRelationshipOneToMany
export const getWithRelationshipOneToManyProperties = (
    properties: Property[],
): Property[] =>
{
    return properties.filter(property => property.relationship?.type === RelationshipType.ONE_TO_MANY);
};

export const getPrimaryKeyPropertiesFromPivotTable = (
    properties: Property[],
): Property[] =>
{
    if (hasPivotProperties(properties))
    {
        return getPrimaryKeyProperties(properties);
    }

    return [];
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
    if (!moduleName) throw new Error('Module name parameter is not defined in getCreateControllerProperties function');

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
    if (!moduleName) throw new Error('Module name parameter is not defined in getUpdateControllerProperties function');

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
    if (!moduleName) throw new Error('Module name parameter is not defined in getCreateServiceProperties function');

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
    if (!moduleName) throw new Error('Module name parameter is not defined in getCreateItemsServiceProperties function');

    return properties
        .filter(property => !timestampProperties.includes(property.name))                                                           // exclude timestamps
        .filter(property => property.relationship?.type !== RelationshipType.ONE_TO_MANY)                                           // exclude one to many relations
        .filter(property => !(property.relationship?.type === RelationshipType.ONE_TO_ONE && !property.relationship?.field))        // exclude one to one relations without relationship field, is relation one to one without xxxxId
        .filter(property => !property.isI18n || (property.isI18n && property.name !== 'id'))                                        // exclude id of i18n table
        .filter(property => !property.isI18n || (property.isI18n && property.name !== moduleName.toCamelCase() + 'Id'));            // exclude relationship id of i18n table
};

// replace by Properties updateService
export const getUpdateServiceProperties = (
    properties: Property[],
    moduleName: string,
): Property[] =>
{
    if (!moduleName) throw new Error('Module name parameter is not defined in getUpdateServiceProperties function');

    return properties
        .filter(property => !timestampProperties.includes(property.name))                                                               // exclude timestamps
        .filter(property => property.relationship?.type !== RelationshipType.ONE_TO_MANY)                                               // exclude one to many relations
        .filter(property => !(property.relationship?.type === RelationshipType.ONE_TO_ONE && !property.relationship?.field))            // exclude one to one relations without relationship field, is relation one to one without xxxxId
        .filter(property => !property.isI18n || (property.isI18n && property.name !== 'id'))                                            // exclude id of i18n table
        .filter(property => !property.isI18n || (property.isI18n && property.name !== moduleName.toCamelCase() + 'Id'))                 // exclude relationship id of i18n table
        .filter(property => !hasI18nProperties(properties) || (hasI18nProperties(properties) && property.name !== 'availableLangs'));   // exclude availableLangs if has i18n table
};

// replace by Properties upsertService
export const getUpsertServiceProperties = (
    properties: Property[],
    moduleName: string,
): Property[] =>
{
    if (!moduleName) throw new Error('Module name parameter is not defined in getUpsertServiceProperties function');

    return properties
        .filter(property => !timestampProperties.includes(property.name))                                                       // exclude timestamps
        .filter(property => property.relationship?.type !== RelationshipType.ONE_TO_MANY)                                       // exclude one to many relations
        .filter(property => !(property.relationship?.type === RelationshipType.ONE_TO_ONE && !property.relationship?.field))    // exclude one to one relations without relationship field, is relation one to one without xxxxId
        .filter(property => !property.isI18n || (property.isI18n && property.name !== 'id'))                                    // exclude id of i18n table
        .filter(property => !property.isI18n || (property.isI18n && property.name !== moduleName.toCamelCase() + 'Id'));        // exclude relationship id of i18n table
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

// replace by Properties isEnum
export const getEnumProperties = (
    properties: Property[],
): Property[] =>
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
export const getCreatedEventProperties = (
    properties: Property[],
): Property[] =>
{
    return properties
        .filter(property => property.relationship?.type !== RelationshipType.ONE_TO_MANY)                                     // exclude one to many relations
        .filter(property => !(property.relationship?.type === RelationshipType.ONE_TO_ONE && !property.relationship?.field)); // exclude one to one relations without relationship field, is relation one to one without xxxxId
};

// replace by Properties updatedEvent
export const getUpdatedEventProperties = (
    properties: Property[],
): Property[] =>
{
    return properties
        .filter(property => property.relationship?.type !== RelationshipType.ONE_TO_MANY)                                     // exclude one to many relations
        .filter(property => !(property.relationship?.type === RelationshipType.ONE_TO_ONE && !property.relationship?.field)); // exclude one to one relations without relationship field, is relation one to one without xxxxId
};

// replace by Properties deletedEvent
export const getDeletedEventProperties = (
    properties: Property[],
): Property[] =>
{
    return properties
        .filter(property => property.relationship?.type !== RelationshipType.ONE_TO_MANY)                                     // exclude one to many relations
        .filter(property => !(property.relationship?.type === RelationshipType.ONE_TO_ONE && !property.relationship?.field)); // exclude one to one relations without relationship  field, is relation one to one without xxxxId
};

/***********
 * GRAPHQL *
 ***********/
// replace by Properties graphqlProperties
export const getGraphqlProperties = (
    properties: Property[],
): Property[] =>
{
    return properties;
};

// replace by Properties graphqlInputProperties
export const getGraphqlInputProperties = (
    properties: Property[],
): Property[] =>
{
    return properties
        .filter(property => !timestampProperties.includes(property.name)); // exclude timestamps
};

/********
 * REST *
 ********/
// replace by Properties dtoProperties
export const getDtoProperties = (
    properties: Property[],
): Property[] =>
{
    return properties;
};

// replace by Properties dtoInputProperties
export const gerDtoInputProperties = (
    properties: Property[],
): Property[] =>
{
    return properties
        .filter(property => !timestampProperties.includes(property.name)); // exclude timestamps
};

/***********
 * TESTING *
 ***********/
// replace by Properties test
export const getTestProperties = (
    properties: Property[],
    moduleName: string,
): Property[] =>
{
    if (!moduleName) throw new Error('Module name parameter is not defined in getTestProperties function');

    return properties
        .filter(property => !timestampProperties.includes(property.name))                                                              // exclude timestamps
        .filter(property => property.relationship?.type !== RelationshipType.ONE_TO_MANY)                                               // exclude one to many relations
        .filter(property => !(property.relationship?.type === RelationshipType.ONE_TO_ONE && !property.relationship?.field))            // exclude one to many relations
        .filter(property => !property.isI18n || (property.isI18n && property.name !== 'id'))                                            // exclude id of i18n table
        .filter(property => !property.isI18n || (property.isI18n && property.name !== moduleName.toCamelCase() + 'Id'))                 // exclude relationship id of i18n table
        .filter(property => !hasI18nProperties(properties) || (hasI18nProperties(properties) && property.name !== 'availableLangs'));   // exclude availableLangs if has i18n table
};

// replace by Properties isNotNullable
export const getNotNullableProperties = (
    properties: Property[],
    moduleName: string,
): Property[] =>
{
    if (!moduleName) throw new Error('Module name parameter is not defined in getNotNullableProperties function');

    return properties.filter(property => property.nullable === false)
        .filter(property => !property.isI18n || (property.isI18n && property.name !== 'id'))                                            // exclude id of i18n table
        .filter(property => !property.isI18n || (property.isI18n && property.name !== moduleName.toCamelCase() + 'Id'))                 // exclude relationship id of i18n table
        .filter(property => !hasI18nProperties(properties) || (hasI18nProperties(properties) && property.name !== 'availableLangs'));   // exclude availableLangs if has i18n table
};

// replace by Properties hasLength
export const countProperties = (
    properties: Property[],
    moduleName: string,
): Property[] =>
{
    if (!moduleName) throw new Error('Module name parameter is not defined in countProperties function');

    // eslint-disable-next-line no-implicit-coercion, unicorn/explicit-length-check
    return properties.filter(property => !!property.length)
        .filter(property => !property.isI18n || (property.isI18n && property.name !== 'id'))                                            // exclude id of i18n table
        .filter(property => !property.isI18n || (property.isI18n && property.name !== moduleName.toCamelCase() + 'Id'))                 // exclude relationship id of i18n table
        .filter(property => !hasI18nProperties(properties) || (hasI18nProperties(properties) && property.name !== 'availableLangs'));   // exclude availableLangs if has i18n table
};

// replace by Properties hasMaxLength
export const getMaxLengthProperties = (
    properties: Property[],
): Property[] =>
{
    return properties.filter(property => Boolean(property.maxLength));
};

// replace by Properties hasMinLength
export const getMinLengthProperties = (
    properties: Property[],
): Property[] =>
{
    return properties.filter(property => Boolean(property.minLength));
};

// replace by Properties decimalProperties
export const getDecimalProperties = (
    properties: Property[],
): Property[] =>
{
    return properties.filter(property => property.type === PropertyType.DECIMAL);
};

// replace by Properties isInteger
export const getIntegerProperties = (
    properties: Property[],
): Property[] =>
{
    return properties.filter(property => property.type === PropertyType.INT);
};

// replace by Properties isIntegerUnsigned
export const getIntegerUnsignedProperties = (
    properties: Property[],
): Property[] =>
{
    return properties.filter(property => property.type === PropertyType['INT.UNSIGNED']);
};

// replace by Properties isBoolean
export const getBooleanProperties = (
    properties: Property[],
): Property[] =>
{
    return properties.filter(property => property.type === PropertyType.BOOLEAN);
};

// replace by Properties isTimestamp
export const getTimestampProperties = (
    properties: Property[],
): Property[] =>
{
    return properties
        .filter(property => !timestampProperties.includes(property.name))          // exclude timestamps
        .filter(property => property.type === PropertyType.TIMESTAMP);
};

/***********
 * POSTMAN *
 ***********/
// replace by Properties postmanGraphQLCreateQuery
export const getPostmanGraphqlCreateMutationProperties = (
    properties: Property[],
    moduleName: string,
): Property[] =>
{
    if (!moduleName) throw new Error('Module name parameter is not defined in getPostmanGraphqlCreateMutationProperties function');

    return properties
        .filter(property => !timestampProperties.includes(property.name))                                                               // exclude timestamps
        .filter(property => property.relationship?.type !== RelationshipType.ONE_TO_MANY)                                               // exclude one to many relations
        .filter(property => property.relationship?.type !== RelationshipType.MANY_TO_MANY)                                              // exclude many to many relations
        .filter(property => !(property.relationship?.type === RelationshipType.ONE_TO_ONE && !property.relationship?.field))            // exclude one to one relations without relationship field, is relation one to one without xxxxId
        .filter(property => !property.isI18n || (property.isI18n && property.name !== 'id'))                                            // exclude id of i18n table
        .filter(property => !property.isI18n || (property.isI18n && property.name !== moduleName.toCamelCase() + 'Id'))                 // exclude relationship id of i18n table
        .filter(property => !hasI18nProperties(properties) || (hasI18nProperties(properties) && property.name !== 'availableLangs'));   // exclude availableLangs if has i18n table
};

// replace by Properties postmanGraphQLCreateVariables
export const getPostmanGraphqlCreateVariablesProperties = (
    properties: Property[],
    moduleName: string,
): Property[] =>
{
    if (!moduleName) throw new Error('Module name parameter is not defined in getPostmanGraphqlCreateVariablesProperties function');

    return properties
        .filter(property => !timestampProperties.includes(property.name))                                                               // exclude timestamps
        .filter(property => property.relationship?.type !== RelationshipType.ONE_TO_MANY)                                               // exclude one to many relations
        .filter(property => property.relationship?.type !== RelationshipType.MANY_TO_MANY)                                              // exclude many to many relations
        .filter(property => !(property.relationship?.type === RelationshipType.ONE_TO_ONE && !property.relationship?.field))            // exclude one to one relations without relationship field, is relation one to one without xxxxId
        .filter(property => !property.isI18n || (property.isI18n && property.name !== 'id'))                                            // exclude id of i18n table
        .filter(property => !property.isI18n || (property.isI18n && property.name !== moduleName.toCamelCase() + 'Id'))                 // exclude relationship id of i18n table
        .filter(property => !hasI18nProperties(properties) || (hasI18nProperties(properties) && property.name !== 'availableLangs'));   // exclude availableLangs if has i18n table
};

// replace by Properties postmanGraphQLGetQuery
export const getPostmanGraphqlGetQueryProperties = (
    properties: Property[],
): Property[] =>
{
    return properties
        .filter(property => !deletedAtProperty.includes(property.name))                                                         // exclude deleteAt
        .filter(property => property.relationship?.type !== RelationshipType.ONE_TO_MANY)                                       // exclude one to many relations
        .filter(property => property.relationship?.type !== RelationshipType.MANY_TO_ONE)                                       // exclude one to many relations
        .filter(property => property.relationship?.type !== RelationshipType.MANY_TO_MANY)                                      // exclude many to many relations
        .filter(property => !(property.relationship?.type === RelationshipType.ONE_TO_ONE && !property.relationship?.field));   // exclude one to one relations without relationship field, is relation one to one without xxxxId
};

// replace by Properties postmanGraphQLFindQuery
export const getPostmanGraphqlFindQueryProperties = (
    properties: Property[],
): Property[] =>
{
    return properties
        .filter(property => !deletedAtProperty.includes(property.name))                                                         // exclude deleteAt
        .filter(property => property.relationship?.type !== RelationshipType.ONE_TO_MANY)                                       // exclude one to many relations
        .filter(property => property.relationship?.type !== RelationshipType.MANY_TO_ONE)                                       // exclude one to many relations
        .filter(property => property.relationship?.type !== RelationshipType.MANY_TO_MANY)                                      // exclude many to many relations
        .filter(property => !(property.relationship?.type === RelationshipType.ONE_TO_ONE && !property.relationship?.field));   // exclude one to one relations without relationship field, is relation one to one without xxxxId
};

// replace by Properties postmanGraphQLFindByIdQuery
export const getPostmanGraphqlFindByIdQueryProperties = (
    properties: Property[],
): Property[] =>
{
    return properties
        .filter(property => !deletedAtProperty.includes(property.name))                                                         // exclude deleteAt
        .filter(property => property.relationship?.type !== RelationshipType.ONE_TO_MANY)                                       // exclude one to many relations
        .filter(property => property.relationship?.type !== RelationshipType.MANY_TO_ONE)                                       // exclude one to many relations
        .filter(property => property.relationship?.type !== RelationshipType.MANY_TO_MANY)                                      // exclude many to many relations
        .filter(property => !(property.relationship?.type === RelationshipType.ONE_TO_ONE && !property.relationship?.field));   // exclude one to one relations without relationship field, is relation one to one without xxxxId
};

// replace by Properties postmanGraphQLUpdateQuery
export const getPostmanGraphqlUpdateMutationProperties = (
    properties: Property[],
): Property[] =>
{
    return properties
        .filter(property => !deletedAtProperty.includes(property.name))                                                         // exclude deleteAt
        .filter(property => property.relationship?.type !== RelationshipType.ONE_TO_MANY)                                       // exclude one to many relations
        .filter(property => property.relationship?.type !== RelationshipType.MANY_TO_ONE)                                       // exclude one to many relations
        .filter(property => property.relationship?.type !== RelationshipType.MANY_TO_MANY)                                      // exclude many to many relations
        .filter(property => !(property.relationship?.type === RelationshipType.ONE_TO_ONE && !property.relationship?.field));   // exclude one to one relations without relationship field, is relation one to one without xxxxId
};

// replace by Properties postmanGraphQLUpdateVariables
export const getPostmanGraphqlUpdateVariablesProperties = (
    properties: Property[],
    moduleName: string,
): Property[] =>
{
    if (!moduleName) throw new Error('Module name parameter is not defined in getPostmanGraphqlUpdateVariablesProperties function');

    return properties
        .filter(property => !timestampProperties.includes(property.name))                                                               // exclude timestamps
        .filter(property => property.relationship?.type !== RelationshipType.ONE_TO_MANY)                                               // exclude one to many relations
        .filter(property => !(property.relationship?.type === RelationshipType.ONE_TO_ONE && !property.relationship?.field))            // exclude one to one relations without relationship field, is relation one to one without xxxxId
        .filter(property => !property.isI18n || (property.isI18n && property.name !== 'id'))                                            // exclude id of i18n table
        .filter(property => !property.isI18n || (property.isI18n && property.name !== moduleName.toCamelCase() + 'Id'))                 // exclude relationship id of i18n table
        .filter(property => !hasI18nProperties(properties) || (hasI18nProperties(properties) && property.name !== 'availableLangs'));   // exclude availableLangs if has i18n table
};

// replace by Properties postmanGraphQLDeleteQuery
export const getPostmanGraphqlDeleteMutationProperties = (
    properties: Property[],
): Property[] =>
{
    return properties
        .filter(property => !deletedAtProperty.includes(property.name))                                                         // exclude deleteAt
        .filter(property => property.relationship?.type !== RelationshipType.ONE_TO_MANY)                                       // exclude one to many relations
        .filter(property => property.relationship?.type !== RelationshipType.MANY_TO_ONE)                                       // exclude one to many relations
        .filter(property => property.relationship?.type !== RelationshipType.MANY_TO_MANY)                                      // exclude many to many relations
        .filter(property => !(property.relationship?.type === RelationshipType.ONE_TO_ONE && !property.relationship?.field));   // exclude one to one relations without relationship field, is relation one to one without xxxxId
};

// replace by Properties postmanRestCreate
export const getPostmanRestCreateProperties = (
    properties: Property[],
): Property[] =>
{
    return properties
        .filter(property => !timestampProperties.includes(property.name))                                                       // exclude timestamps
        .filter(property => property.relationship?.type !== RelationshipType.ONE_TO_MANY)                                       // exclude one to many relations
        .filter(property => !(property.relationship?.type === RelationshipType.ONE_TO_ONE && !property.relationship?.field));   // exclude one to many relations
};

// replace by Properties postmanRestUpdate
export const getPostmanRestUpdateProperties = (
    properties: Property[],
): Property[] =>
{
    return properties
        .filter(property => !timestampProperties.includes(property.name))                                                       // exclude timestamps
        .filter(property => property.relationship?.type !== RelationshipType.ONE_TO_MANY)                                       // exclude one to many relations
        .filter(property => !(property.relationship?.type === RelationshipType.ONE_TO_ONE && !property.relationship?.field));   // exclude one to many relations
};

/*********
 * FRONT *
 *********/
// replace by Properties gridFields
export const getGridFieldsProperties = (
    properties: Property[],
): Property[] =>
{
    return properties
        .filter(property => !timestampProperties.includes(property.name))
        .filter(property => property.name !== 'availableLangs')
        .filter(property => property.name !== 'meta')
        .filter(property => property.name !== 'id');
};

// replace by Properties formDetailFields
export const getFormDetailFieldsProperties = (
    properties: Property[],
): Property[] =>
{
    return properties
        .filter(property => !timestampProperties.includes(property.name))
        .filter(property => property.name !== 'id');
};

// replace by Properties formGroupFields
export const getFormGroupFieldsProperties = (
    properties: Property[],
): Property[] =>
{
    return properties
        .filter(property => !timestampProperties.includes(property.name))
        .filter(property => property.name !== 'availableLangs')
        .filter(property => property.name !== 'meta');
};

// replace by Properties formGroupFieldsIsNotI18n
export const getFormGroupFieldsIsNotI18nProperties = (
    properties: Property[],
): Property[] =>
{
    return properties
        .filter(property => !timestampProperties.includes(property.name))
        .filter(property => !property.isI18n)
        .filter(property => property.name !== 'availableLangs')
        .filter(property => property.name !== 'meta');
};

// replace by Properties withWebComponents
export const getWebComponentsProperties = (
    properties: Property[],
): Property[] =>
{
    return properties
        .filter(property => Boolean(property.webComponent?.type));
};

// replace by Properties withSelectWebComponents
export const getSelectWebComponentsProperties = (
    properties: Property[],
): Property[] =>
{
    return properties
        .filter(property => property.webComponent?.type === WebComponentType.SELECT);
};

// replace by Properties withGridSelectElementWebComponents
export const getGridSelectElementWebComponentsProperties = (
    properties: Property[],
): Property[] =>
{
    return properties
        .filter(property => property.webComponent?.type === WebComponentType.GRID_SELECT_ELEMENT);
};

// replace by Properties withGridElementsManagerWebComponents
export const getGridElementsManagerWebComponentsProperties = (
    properties: Property[],
): Property[] =>
{
    return properties
        .filter(property => property.webComponent?.type === WebComponentType.GRID_ELEMENTS_MANAGER);
};
