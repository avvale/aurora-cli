import { Command } from '@oclif/core';

export interface AddCommandState extends CommandState
{
    packageName: string;
}

export interface AdditionalApi
{
    path: string;
    resolverType: ResolverType;
    httpMethod: HttpMethodType;
}

export interface AdditionalApiPaths
{
    pathBoundedContext: string;
    pathAction: string;
    pathSegments: string[];
}

export interface CommandState
{
    command: Command;
    flags: LiteralObject;
}

export interface ConstructorInjectionStatement
{
    scope: 'private' | 'public' | 'protected';
    readonly?: boolean;
    variableName: string;
    className: string;
}

export interface GenerateCommandState extends CommandState
{
    lockFiles: LockFile[];
    schema: ModuleDefinitionSchema;
}

export interface GeneratePipelineCommandState extends CommandState
{
    scope: string;
    from: string;
    to: string;
    service: string;
}

export enum HttpMethodType
{
    GET = 'get',
    HEAD = 'head',
    POST = 'post',
    PUT = 'put',
    DELETE = 'delete',
    CONNECT = 'connect',
    OPTIONS = 'options',
    TRACE = 'trace',
    PATCH = 'patch',
}

export interface ImportStatement
{
    items: string[] | string;
    path: string;
    defaultImport?: boolean;
    oneRowByItem?: boolean;
}

export interface LiteralObject
{
    [key: string]: any;
}

export interface LockFile
{
    path: string;
    integrity: string;
}

export interface ModuleDefinitionSchema
{
    boundedContextName: string;
    moduleName: string;
    moduleNames: string;
    aggregateName: string;
    hasOAuth: boolean;
    hasTenant: boolean;
    hasAuditing: boolean;
    front?: {
        outlineFontSetIcon?: string;
        outlineIcon?: string;
        solidFontSetIcon?: string;
        solidIcon?: string;
    }
    aggregateProperties: Property[];
    additionalApis?: AdditionalApi[];
    excludedFiles?: string[];                // set files to avoid create
    excludedOperations?: string[];           // set operations to avoid create
}

export interface NewBackCommandState extends CommandState
{
    appName: string;
}

export interface NewFrontCommandState extends CommandState
{
    appName: string;
}

export interface PropertyWebComponent
{
    type: WebComponentType;
    property: Property;
    detailSort?: number;
    isDetailHidden?: boolean;
    listSort?: number;
    isListHidden?: boolean;
}

export interface PropertyArrayOptions
{
    type: PropertyType;
    length?: number;
    maxLength?: number;
    enumOptions?: string[];
}

export interface Property
{
    type: PropertyType;
    name: string;
    nullable?: boolean;
    unsigned?: boolean;
    defaultValue?: string | number;
    primaryKey?: boolean;
    index?: PropertyIndex;
    indexFields?: string[];
    indexName?: string;
    indexUsing?: PropertyIndexUsing;
    autoIncrement?: boolean;
    applyTimezone?: boolean;
    decimals?: number[];
    enumOptions?: string[];
    length?: number;
    minLength?: number;
    maxLength?: number;
    relationship?: PropertyRelationship;
    isI18n?: boolean;
    example?: any;
    faker?: string;
    webComponent?: PropertyWebComponent;
    aggregateName?: string;
    modulePath?: string;
    arrayOptions?: PropertyArrayOptions;
}

export interface PropertyRelationship
{
    type: RelationshipType;
    singularName?: string;
    aggregateName: string;
    modulePath: string;
    key?: string;
    field: string;
    avoidConstraint: boolean;
    packageName?: string;
    isDenormalized?: boolean;
    pivot?: RelationshipPivot;
}

export enum PropertyIndex
{
    UNIQUE  = 'unique',
    INDEX   = 'index',
}

export enum PropertyIndexUsing
{
    BTREE = 'Btree',
    GIN = 'GIN',
    HASH = 'HASH',
    SPGIST = 'spgist',
    GIST = 'GiST',
    BRIN = 'BRIN',
}

export enum PropertyType
{
    'ARRAY'             = 'array',
    'BIGINT'            = 'bigint',
    'BLOB'              = 'blob',
    'BOOLEAN'           = 'boolean',
    'CHAR'              = 'char',
    'DATE'              = 'date',
    'DECIMAL'           = 'decimal',
    'ENCRYPTED'         = 'encrypted',
    'ENUM'              = 'enum',
    'FLOAT'             = 'float',
    'ID'                = 'id',
    'INT'               = 'int',
    'JSON'              = 'json',
    'JSONB'             = 'jsonb',
    'LONGBLOB'          = 'blob.long',
    'MEDIUMBLOB'        = 'blob.medium',
    'PASSWORD'          = 'password',
    'RELATIONSHIP'      = 'relationship',
    'SMALLINT'          = 'smallint',
    'TEXT'              = 'text',
    'TIMESTAMP'         = 'timestamp',
    'TINYBLOB'          = 'blob.tiny',
    'VARCHAR'           = 'varchar',
}

export interface RelationshipPivot
{
    boundedContextName: string;
    moduleName: string;
    moduleNames: string;
    aggregateName: string;
    aggregateProperties: Property[];
    excludedFiles?: string[];                // set files to avoid create
    excludedOperations?: string[];           // set operations to avoid create
}

export enum RelationshipType
{
    NONE            = 'none',
    ONE_TO_ONE      = 'one-to-one',
    ONE_TO_MANY     = 'one-to-many',
    MANY_TO_ONE     = 'many-to-one',
    MANY_TO_MANY    = 'many-to-many'
}

export enum ResolverType
{
    QUERY = 'query',
    MUTATION = 'mutation',
}

export interface ReturnTypeStatement
{
    variableName: string;
    className: string;
}

export enum Scope
{
    BACK  = 'back',
    PIPELINE = 'pipeline',
    FRONT = 'front',
}

export enum ScopeElement
{
    MODULE  = 'module',
    BOUNDED_CONTEXT  = 'bounded-context',
}

export enum TemplateElement
{
    BACK_ADDITIONAL_API       = 'back/additional-@api',
    BACK_API                  = 'back/@api',
    BACK_APP                  = 'back/@app',
    BACK_APPLICATION          = 'back/application',
    BACK_BOUNDED_CONTEXT      = 'back/bounded-context',
    BACK_ENV                  = 'back/env',
    BACK_I18N_APP             = 'back/i18n-@app',
    BACK_PIVOT                = 'back/pivot',
    BACK_PACKAGE              = 'back/package',
    BACK_TEST                 = 'back/test',
    BACK_PACKAGES             = 'back/packages',
    BACK_POSTMAN              = 'back/postman',
    BACK_VALUE_OBJECT         = 'back/value-object',
    PIPELINE                  = 'pipeline',
    FRONT_APPLICATION         = 'front/application',
    FRONT_MODULE              = 'front/module',
    FRONT_MODULE_TRANSLATIONS = 'front/module-translations',
    FRONT_PACKAGES            = 'front/packages',
}

export enum TemplateFile
{
    FILE            = 'bounded-context',
    VALUE_OBJECT    = 'module',
}

export interface VariableInjectionStatement
{
    variableName: string;
    className: string;
}

export enum WebComponentType
{
    /**
     * manage many-to-many relationships by creating a dropdown of related items,
     * with the functionality to search elements
     */
    ASYNC_SEARCH_MULTIPLE_SELECT = 'async-search-multiple-select',

    /**
     * manage many-to-one relationships by creating a dropdown of related item,
     * with the functionality to search element
     */
    ASYNC_SEARCH_SELECT = 'async-search-select',

    /**
     * manage one-to-many relationships by creating a grid of related items,
     * with the functionality to create, edit and delete related elements
     */
    GRID_ELEMENTS_MANAGER = 'grid-elements-manager',

    /**
     * manage many-to-one relationships by allowing you to select
     * an element within a grid with search functionality
     */
    GRID_SELECT_ELEMENT = 'grid-select-element',

    /**
     * manage many-to-many relationships by allowing you to select
     * an elements within a grid with search functionality
     */
    GRID_SELECT_MULTIPLE_ELEMENTS = 'grid-select-multiple-elements',

    /**
     * dropdown to select multiple elements from a list of related items
     */
    MULTIPLE_SELECT = 'multiple-select',

    /**
     * dropdown to select one element from a list of related items
     */
    SELECT = 'select',

    /**
     * dropdown to select one element from a list of related items with search functionality
     */
    SEARCH_SELECT = 'search-select',
}
