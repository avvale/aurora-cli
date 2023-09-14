import { CliterConfig } from '../config';
import { ModuleDefinitionSchema, Property, PropertyType, RelationshipType } from '../types';
import { loadYamlByBoundedContextModule } from './yaml-manager';

// replace by Property name
export const getPropertyName = (
    property: Property,
): string =>
{
    // properties that represent many to many relationships, are arrays of ids
    if (property.relationship?.type === RelationshipType.MANY_TO_MANY) return `${property.relationship.singularName}Ids`;
    return property.name;
};

// replace by Property hasTimezone
export const isTimezoneProperty = (
    property: Property,
): boolean =>
{
    return property.type === PropertyType.TIMESTAMP;
};

// replace by Property getSequelizeType
export const getPropertySequelizeType = (
    property: Property,
    config: CliterConfig,
): string =>
{
    let parameter: number | string | undefined | number[];
    if (property.type === PropertyType.CHAR)    parameter = property.length;                        // parameter = length
    if (property.type === PropertyType.VARCHAR) parameter = property.maxLength;                     // parameter = maxLength
    if (property.type === PropertyType.ENUM)    parameter = getPropertyStringEnumOptions(property); // parameter = values
    if (property.type === PropertyType.DECIMAL) parameter = property.decimals;                      // parameter = decimals

    return config.propertyTypesEquivalenceSequelizeTypes[property.type](parameter);
};

// replace by Property getJavascriptModelType
export const getJavascriptModelTypeProperty = (
    property: Property,
    config: CliterConfig,
): string =>
{
    if (property.relationship?.type === RelationshipType.MANY_TO_MANY)  return config.propertyTypesEquivalenceJavascriptTypes.manyToMany;
    if (property.type === PropertyType.RELATIONSHIP)                    return `${property.relationship?.aggregateName}[]`;

    return config.propertyTypesEquivalenceJavascriptModelTypes[property.type];
};

// replace by Property getDefaultValue
export const getDefaultValueProperty = (
    property: Property,
): any =>
{
    return typeof property.defaultValue === 'boolean' || typeof property.defaultValue === 'number' ? property.defaultValue :  `'${property.defaultValue}'`;
};

// replace by Property hasQuotation
export const hasQuotationProperty = (
    property: Property,
    config: CliterConfig,
): boolean =>
{
    return config.quotationTypes[property.type];
};

// replace by Property getReferenceKey
export const getReferenceKeyProperty = (
    property: Property,
): any =>
{
    return property.relationship?.key ? property.relationship?.key : 'id';
};

// replace by Property enumOptionsArrayItems
export const getPropertyStringEnumOptions = (
    property: Property,
): string | undefined =>
{
    return getPropertyEnumOptions(property)?.map((option: string) => '\'' + option + '\'').join(',');
};

// replace by Property enumOptions
export const getPropertyEnumOptions = (
    property: Property,
): string[] | undefined =>
{
    return property.enumOptions?.map((option: string) => option.trim().toUpperCase());
};

// replace by Property isRelationship
export const isRelationshipProperty = (
    property: Property,
): boolean =>
{
    return property.type === PropertyType.RELATIONSHIP;
};

// replace by Property isBinary
export const isBinaryProperty = (
    property: Property,
): boolean =>
{
    return property.type === PropertyType.BLOB || property.type === PropertyType.MEDIUMBLOB || property.type === PropertyType.LONGBLOB;
};

/********************
 * MODEL DECORATORS *
 ********************/
// replace by Property hasColumnDecorator
export const hasColumnDecoratorProperty = (
    property: Property,
): boolean =>
{
    return property.relationship?.type !== RelationshipType.ONE_TO_MANY &&
        property.relationship?.type !== RelationshipType.MANY_TO_MANY &&
        !(
            property.relationship?.type === RelationshipType.ONE_TO_ONE &&
            !property.relationship.field
        );
};

// replace by Property hasHasOneDecorator
export const hasHasOneDecoratorProperty = (
    property: Property,
): boolean =>
{
    return property.relationship?.type === RelationshipType.ONE_TO_ONE &&
        !property.relationship.field;
};

// replace by Property hasBelongsToDecorator
export const hasBelongsToDecoratorProperty = (
    property: Property,
): boolean =>
{
    return  (
        property.relationship?.type === RelationshipType.MANY_TO_ONE &&
        Boolean(property.relationship.field)
    ) ||
    (
        property.relationship?.type === RelationshipType.ONE_TO_ONE &&
        Boolean(property.relationship.field)
    );
};

export const isPivotProperty = (
    property: Property,
): boolean =>
{
    return Boolean(property.aggregateName && property.modulePath);
};

// replace by Property hasHasManyDecorator
export const hasHasManyDecoratorProperty = (
    property: Property,
): boolean =>
{
    return property.relationship?.type === RelationshipType.ONE_TO_MANY;
};

// replace by Property hasBelongsToManyDecorator
export const hasHasBelongsToManyDecoratorProperty = (
    property: Property,
): boolean =>
{
    return property.relationship?.type === RelationshipType.MANY_TO_MANY;
};

/****************
 * RELATIONSHIP *
 ****************/
// replace by Property getPropertiesFromRelationship
export const getPropertiesFromPropertyRelationship = (
    modulePath: string,
): Property[] | null =>
{
    try
    {
        return loadYamlByBoundedContextModule(modulePath).aggregateProperties;
    }
    catch
    {
        throwRelationshipEntityNotCreatedProperty(
            modulePath,
            'aggregateProperties',
        );
    }

    return null;
};

// replace by Property getRelationshipAggregateName
export const getAggregateNameFromPropertyRelationship = (
    modulePath: string,
): string | null =>
{
    try
    {
        return loadYamlByBoundedContextModule(modulePath).aggregateName;
    }
    catch
    {
        throwRelationshipEntityNotCreatedProperty(
            modulePath,
            'aggregateName',
        );
    }

    return null;
};

export const getBoundedContextNameFromPropertyRelationship = (
    modulePath: string,
): string | null =>
{
    try
    {
        return loadYamlByBoundedContextModule(modulePath).boundedContextName;
    }
    catch
    {
        throwRelationshipEntityNotCreatedProperty(
            modulePath,
            'boundedContextName',
        );
    }

    return null;
};

export const getModuleNameFromPropertyRelationship = (
    modulePath: string,
): string | null =>
{
    try
    {
        return loadYamlByBoundedContextModule(modulePath).moduleName;
    }
    catch
    {
        throwRelationshipEntityNotCreatedProperty(
            modulePath,
            'moduleName',
        );
    }

    return null;
};

export const getModuleNamesFromPropertyRelationship = (
    modulePath: string,
): string | null =>
{
    try
    {
        return loadYamlByBoundedContextModule(modulePath).moduleNames;
    }
    catch
    {
        throwRelationshipEntityNotCreatedProperty(
            modulePath,
            'moduleNames',
        );
    }

    return null;
};

// replace by Property getRelationshipSchema
export const getSchemaFromPropertyRelationship = (
    modulePath: string,
): ModuleDefinitionSchema | null =>
{
    try
    {
        return loadYamlByBoundedContextModule(modulePath);
    }
    catch
    {
        throwRelationshipEntityNotCreatedProperty(
            modulePath,
            'schema',
        );
    }

    return null;
};

// replace by Property throwRelationshipEntityNorCreated
export const throwRelationshipEntityNotCreatedProperty = (
    modulePath: string,
    type: 'schema' | 'boundedContextName' | 'moduleName' | 'moduleNames' | 'aggregateProperties' | 'aggregateName',
): void =>
{
    throw new Error(`
Getting relationship module from path ${modulePath} to get a ${type}.
For fields with relationship, you must previously create the yaml
of the related entity, you can do it manually or through the CLI
using the command:

aurora generate back module -n=${modulePath}

And create related entity.

The yaml for the current entity has been created, regenerate
the module ${modulePath} again when you have created the yaml
for the entity related ${modulePath}, with the command:

aurora load back module -n=${modulePath} -ft
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
): string =>
{
    if (property.relationship?.type === RelationshipType.MANY_TO_MANY)                                  return config.propertyTypesEquivalenceQraphqlTypes.manyToMany;
    if (property.relationship?.type === RelationshipType.ONE_TO_ONE && !property.relationship.field)    return `${getBoundedContextNameFromPropertyRelationship(property.relationship.modulePath)?.toPascalCase()}Create${getModuleNameFromPropertyRelationship(property.relationship.modulePath)?.toPascalCase()}Input`;
    return config.propertyTypesEquivalenceQraphqlTypes[property.type];
};

// replace by Property getGraphqlUpdateType
export const getGraphqlUpdateTypeProperty = (
    property: Property,
    config: CliterConfig,
): string =>
{
    if (property.relationship?.type === RelationshipType.MANY_TO_MANY)                                  return config.propertyTypesEquivalenceQraphqlTypes.manyToMany;
    if (property.relationship?.type === RelationshipType.ONE_TO_ONE && !property.relationship.field)    return `${getBoundedContextNameFromPropertyRelationship(property.relationship.modulePath)?.toPascalCase()}Update${getModuleNameFromPropertyRelationship(property.relationship.modulePath)?.toPascalCase()}Input`;
    return config.propertyTypesEquivalenceQraphqlTypes[property.type];
};

// replace by Property getJavascriptType
export const getPropertyJavascriptType = (
    property: Property,
    config: CliterConfig,
): string =>
{
    if (property.type === PropertyType.RELATIONSHIP)                      return `${property.relationship?.aggregateName}[]`;

    return config.propertyTypesEquivalenceJavascriptTypes[property.type];
};

export const getPropertyJavascriptCreateType = (
    property: Property,
    config: CliterConfig,
): string =>
{
    if (property.relationship?.type === RelationshipType.MANY_TO_MANY)    return config.propertyTypesEquivalenceJavascriptTypes.manyToMany;
    if (property.type === PropertyType.RELATIONSHIP)                      return `${property.relationship?.aggregateName}[]`;

    return config.propertyTypesEquivalenceJavascriptTypes[property.type];
};

export const getPropertyJavascriptUpdateType = (
    property: Property,
    config: CliterConfig,
): string =>
{
    if (property.relationship?.type === RelationshipType.MANY_TO_MANY)    return config.propertyTypesEquivalenceJavascriptTypes.manyToMany;
    if (property.type === PropertyType.RELATIONSHIP)                      return `${property.relationship?.aggregateName}[]`;

    return config.propertyTypesEquivalenceJavascriptTypes[property.type];
};

/*********
 * FRONT *
 *********/
// replace by Property getColumnDataType
export const getPropertyColumnDataType = (
    property: Property,
    config: CliterConfig,
): string =>
{
    return config.propertyTypesEquivalenceDashboardColumnDataTypes[property.type];
};
