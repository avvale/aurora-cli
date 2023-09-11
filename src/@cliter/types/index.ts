import { Command } from '@oclif/core';
import { AdditionalApi } from '../utils/additional-api';

export interface CommandState
{
    command: Command;
    flags: LiteralObject;
}

export interface AddCommandState extends CommandState
{
    packageName: string;
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
    solidIcon?: string;
    outlineIcon?: string;
    aggregateProperties: Property[];
    additionalApis?: AdditionalApi[];
    excluded?: string[];                // set files to avoid create
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
}

export interface Property
{
    type: PropertyType;
    name: string;
    nullable?: boolean;
    defaultValue?: string | number;
    primaryKey?: boolean;
    index?: PropertyIndex;
    indexName?: string;
    autoIncrement?: boolean;
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
    INDEX   = 'index'
}

export enum PropertyType
{
    'BIGINT.UNSIGNED'   = 'bigint.unsigned',
    'BIGINT'            = 'bigint',
    'BLOB'              = 'blob',
    'BOOLEAN'           = 'boolean',
    'CHAR'              = 'char',
    'DATE'              = 'date',
    'DECIMAL'           = 'decimal',
    'ENUM'              = 'enum',
    'FLOAT'             = 'float',
    'ID'                = 'id',
    'INT.UNSIGNED'      = 'int.unsigned',
    'INT'               = 'int',
    'JSON'              = 'json',
    'LONGBLOB'          = 'blob.long',
    'MEDIUMBLOB'        = 'blob.medium',
    'PASSWORD'          = 'password',
    'RELATIONSHIP'      = 'relationship',
    'SMALLINT.UNSIGNED' = 'smallint.unsigned',
    'SMALLINT'          = 'smallint',
    'TEXT'              = 'text',
    'TIMESTAMP'         = 'timestamp',
    'TINYBLOB'          = 'blob.tiny',
    'TINYINT.UNSIGNED'  = 'tinyint.unsigned',
    'TINYINT'           = 'tinyint',
    'VARCHAR'           = 'varchar',
}

export interface RelationshipPivot
{
    boundedContextName: string;
    moduleName: string;
    moduleNames: string;
    aggregateName: string;
    aggregateProperties: Property[];
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
     * manage one-to-many relationships by creating a grid of related items,
     * with the functionality to create, edit and delete related elements
     */
    GRID_ELEMENTS_MANAGER = 'grid-elements-manager',

    /**
     * dropdown to select one element from a list of related items
     */
    SELECT = 'select',

    /**
     * dropdown to select multiple elements from a list of related items
     */
    MULTIPLE_SELECT = 'multiple-select',
}
