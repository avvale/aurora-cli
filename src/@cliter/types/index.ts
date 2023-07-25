import { Command } from '@oclif/core';
import { AdditionalApis, Properties, Property } from '../utils';

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
    properties: Properties;
    additionalApis: AdditionalApis;
    excluded?: string[];        // set files to avoid create
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

export interface PropertyRelationship
{
    type: RelationshipType;
    singularName?: string;
    aggregate: string;
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
    aggregate: string;
    modulePath: string;
    fileName: string;
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
}

export enum TemplateElement
{
    BACK_ADDITIONAL_API       = 'back/additional-@api',
    BACK_API                  = 'back/@api',
    BACK_APP                  = 'back/@app',
    BACK_APPLICATION          = 'back/application',
    BACK_BOUNDED_CONTEXT      = 'back/bounded-context',
    BACK_ENV                  = 'back/env',
    BACK_I18N_API             = 'back/i18n-@api',
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
    GRID_SELECT_ELEMENT   = 'grid-select-element',
    GRID_ELEMENTS_MANAGER = 'grid-elements-manager',
    SELECT                = 'select'
}
