import { Command } from '@oclif/core';
import { AdditionalApis, Properties } from '../utils';

export interface CommandState
{
    command: Command;
    flags: LiteralObject;
}

export interface GenerateCommandState extends CommandState
{
    lockFiles: LockFile[];
    schema: ModuleDefinitionSchema;
}

export interface GeneratePipelineCommandState extends CommandState
{
    from: string;
    to: string;
    service: string;
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

export enum ResolverType
{
    QUERY = 'query',
    MUTATION = 'mutation',
}

export enum Scope
{
    BACK  = 'back',
    CI_CD = 'ci-cd',
    FRONT = 'front',
}

export enum ScopeElement
{
    MODULE  = 'module',
}

export enum SqlIndex
{
    UNIQUE  = 'unique',
    INDEX   = 'index'
}

export enum SqlRelationship
{
    NONE            = 'none',
    ONE_TO_ONE      = 'one-to-one',
    ONE_TO_MANY     = 'one-to-many',
    MANY_TO_ONE     = 'many-to-one',
    MANY_TO_MANY    = 'many-to-many'
}

export enum SqlType
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

export enum TemplateElement
{
    BACK_ADDITIONAL_API       = 'back/additional-api',
    BACK_API                  = 'back/api',
    BACK_APPLICATION          = 'back/application',
    BACK_BOUNDED_CONTEXT      = 'back/bounded-context',
    BACK_ENV                  = 'back/env',
    BACK_I18N_API             = 'back/i18n-api',
    BACK_I18N_MODULE          = 'back/i18n-module',
    BACK_PIVOT                = 'back/pivot',
    BACK_MODULE               = 'back/module',
    BACK_PACKAGE              = 'back/package',
    BACK_TEST                 = 'back/test',
    BACK_PACKAGES             = 'packages/back',
    BACK_POSTMAN              = 'back/postman',
    BACK_VALUE_OBJECT         = 'back/value-object',
    CI_CD                     = 'ci-cd',
    FRONT_APPLICATION         = 'front/application',
    FRONT_MODULE              = 'front/module',
    FRONT_MODULE_TRANSLATIONS = 'front/module-translations',
    FRONT_PACKAGES            = 'packages/front',
}

export enum TemplateFile
{
    FILE            = 'bounded-context',
    VALUE_OBJECT    = 'module',
}
