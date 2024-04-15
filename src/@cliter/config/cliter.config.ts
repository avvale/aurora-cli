import * as path from 'node:path';
import { Property } from '../types';
import { getPropertyStringEnumOptions } from '../utils';

export interface CliterConfig
{
    appsContainer: string;
    dashboardContainer: string;
    dashboardTranslations: string;
    adminContainer: string;
    appContainer: string;
    apiContainer: string;
    auroraCorePackage: string;
    auroraLocalPackage: string;
    configYamlVersion: string;
    lockJsonVersion: string;
    schemaDefinitionExtension: string;
    timestampFields: string[];
    deletedAtField: string[];
    propertyTypesEquivalenceDashboardColumnDataTypes: { [key: string]: string };
    isUnaccentProperty: { [key: string]: boolean };
    propertyTypesEquivalenceJavascriptTypes: { [key: string]: string };
    propertyTypesEquivalenceJavascriptModelTypes: { [key: string]: string };
    propertyTypesEquivalenceSwaggerTypes: { [key: string]: string };
    propertyTypesEquivalenceDtoTypes: { [key: string]: (property?: Property, config?: CliterConfig) => string };
    propertyTypesEquivalenceQraphqlTypes: { [key: string]: string };
    propertyTypesEquivalenceSequelizeTypes: { [key: string]: Function };
    defaultTypeLength: { [key: string]: number };
    quotationTypes: { [key: string]: boolean };
    fileTags: { [key: string]: string };
    compareActions: { [key: string]: string };
    skipDirectories: string[];
    avoidOverwritingFilesIfExist: string[];
    allowedRenderExtensions: string[];
    platformFromDeploy: string[];
    platformToDeploy: string[];
    serviceToDeploy: { front: { [key: string]: string[]; }, back: { [key: string]: string[]; } };
    backPackages: string[];
    frontPackages: string[];
}

export const cliterConfig: CliterConfig =
{
    // front
    appsContainer        : '@apps',
    dashboardContainer   : path.join('app', 'modules', 'admin', 'apps'),
    adminContainer       : path.join('app', 'modules', 'admin'),
    dashboardTranslations: path.join('assets', 'i18n'),

    // back
    appContainer                                    : '@app',
    apiContainer                                    : '@api',
    auroraLocalPackage                              : '@aurora',
    auroraCorePackage                               : '@aurorajs.dev/core',
    configYamlVersion                               : '0.0.1',
    lockJsonVersion                                 : '0.0.1',
    schemaDefinitionExtension                       : '.aurora.yaml',
    timestampFields                                 : ['createdAt', 'updatedAt', 'deletedAt'],
    deletedAtField                                  : ['deletedAt'],
    propertyTypesEquivalenceDashboardColumnDataTypes: {
        'blob.long'  : 'BINARY',
        'blob.medium': 'BINARY',
        'blob.tiny'  : 'BINARY',
        array        : 'STRING',
        bigint       : 'NUMBER',
        blob         : 'BINARY',
        boolean      : 'BOOLEAN',
        char         : 'STRING',
        date         : 'DATE',
        decimal      : 'NUMBER',
        enum         : 'ENUM',
        float        : 'NUMBER',
        id           : 'STRING',
        int          : 'NUMBER',
        json         : 'JSON',
        jsonb        : 'JSONB',
        manyToMany   : '',
        password     : 'STRING',
        smallint     : 'NUMBER',
        text         : 'STRING',
        timestamp    : 'TIMESTAMP',
        varchar      : 'STRING',
    },
    isUnaccentProperty: {
        'blob.long'  : false,
        'blob.medium': false,
        'blob.tiny'  : false,
        array        : false,
        bigint       : false,
        blob         : false,
        boolean      : false,
        char         : true,
        date         : false,
        decimal      : false,
        enum         : false,
        float        : false,
        id           : false,
        int          : false,
        json         : true,
        jsonb        : true,
        manyToMany   : false,
        password     : false,
        smallint     : false,
        text         : true,
        timestamp    : false,
        varchar      : true,
    },
    propertyTypesEquivalenceJavascriptTypes: {
        'blob.long'  : 'string',
        'blob.medium': 'string',
        'blob.tiny'  : 'string',
        bigint       : 'number',
        blob         : 'string',
        boolean      : 'boolean',
        char         : 'string',
        date         : 'string',
        decimal      : 'number',
        enum         : 'string',
        float        : 'number',
        id           : 'string',
        int          : 'number',
        json         : 'any',
        jsonb        : 'any',
        manyToMany   : 'string[]',
        password     : 'string',
        smallint     : 'number',
        text         : 'string',
        timestamp    : 'string',
        varchar      : 'string',
    },
    propertyTypesEquivalenceJavascriptModelTypes: {
        'blob.long'  : 'Buffer',
        'blob.medium': 'Buffer',
        'blob.tiny'  : 'Buffer',
        bigint       : 'number',
        blob         : 'Buffer',
        boolean      : 'boolean',
        char         : 'string',
        date         : 'string',
        decimal      : 'number',
        enum         : 'string',
        float        : 'number',
        id           : 'string',
        int          : 'number',
        json         : 'any',
        jsonb        : 'any',
        manyToMany   : 'string[]',
        password     : 'string',
        smallint     : 'number',
        text         : 'string',
        timestamp    : 'string',
        varchar      : 'string',
    },
    propertyTypesEquivalenceSwaggerTypes: {
        'blob.long'  : 'String',
        'blob.medium': 'String',
        'blob.tiny'  : 'String',
        array        : 'Array',
        bigint       : 'Number',
        blob         : 'String',
        boolean      : 'Boolean',
        char         : 'String',
        date         : 'String',
        decimal      : 'Number',
        enum         : 'String',
        float        : 'Number',
        id           : 'String',
        int          : 'Number',
        json         : 'Object',
        jsonb        : 'Object',
        manyToMany   : '[String]',
        password     : 'String',
        smallint     : 'Number',
        text         : 'String',
        timestamp    : 'String',
        varchar      : 'String',
    },
    propertyTypesEquivalenceDtoTypes: {
        'blob.long'  : () => 'string',
        'blob.medium': () => 'string',
        'blob.tiny'  : () => 'string',
        array        : (property?: Property, config?: CliterConfig) => config!.propertyTypesEquivalenceDtoTypes[property!.arrayOptions!.type]() + '[]',
        bigint       : () => 'number',
        blob         : () => 'string',
        boolean      : () => 'boolean',
        char         : () => 'string',
        date         : () => 'string',
        decimal      : () => 'number',
        enum         : () => 'string',
        float        : () => 'number',
        id           : () => 'string',
        int          : () => 'number',
        json         : () => 'any',
        jsonb        : () => 'any',
        manyToMany   : () => 'string[]',
        password     : () => 'string',
        smallint     : () => 'number',
        text         : () => 'string',
        timestamp    : () => 'string',
        varchar      : () => 'string',
    },
    propertyTypesEquivalenceQraphqlTypes: {
        'blob.long'  : 'GraphQLString',
        'blob.medium': 'GraphQLString',
        'blob.tiny'  : 'GraphQLString',
        bigint       : 'GraphQLInt',
        blob         : 'GraphQLString',
        boolean      : 'GraphQLBoolean',
        char         : 'GraphQLString',
        date         : 'GraphQLISODateTime',
        decimal      : 'GraphQLFloat',
        enum         : 'GraphQLString',
        float        : 'GraphQLFloat',
        id           : 'ID',
        int          : 'GraphQLInt',
        json         : 'JSON',
        jsonb        : 'JSON',
        manyToMany   : '[ID]',
        password     : 'GraphQLString',
        smallint     : 'GraphQLInt',
        text         : 'GraphQLString',
        timestamp    : 'GraphQLTimestamp', 
        varchar      : 'GraphQLString',
    },
    propertyTypesEquivalenceSequelizeTypes: {
        'blob.long'  : (length: number): string => 'DataTypes.BLOB(\'long\')',
        'blob.medium': (length: number): string => 'DataTypes.BLOB(\'medium\')',
        'blob.tiny'  : (length: number): string => 'DataTypes.BLOB(\'tiny\')',
        bigint       : (length: number): string => 'DataTypes.BIGINT',
        blob         : (length: number): string => 'DataTypes.BLOB',
        boolean      : (length: number): string => 'DataTypes.BOOLEAN',
        char         : (length: number): string => `DataTypes.CHAR(${length?.toString()})`,
        date         : (length: number): string => 'DataTypes.DATE',
        decimal      : (decimals: number[]): string => `DataTypes.DECIMAL(${decimals.join(',')})`,
        enum         : (property: Property): string => `DataTypes.ENUM(${getPropertyStringEnumOptions(property)})`,
        float        : (length: number): string => 'DataTypes.FLOAT',
        id           : (length: number): string => 'DataTypes.UUID',
        int          : (length: number): string => 'DataTypes.INTEGER',
        json         : (length: number): string => 'DataTypes.JSON',
        jsonb        : (length: number): string => 'DataTypes.JSONB',
        password     : (length: number): string => `DataTypes.STRING(${length?.toString()})`,
        smallint     : (length: number): string => 'DataTypes.SMALLINT',
        text         : (length: number): string => 'DataTypes.TEXT',
        timestamp    : (length: number): string => 'DataTypes.DATE',
        varchar      : (property: Property): string => `DataTypes.STRING(${property?.maxLength ? property.maxLength.toString() : ''})`,
        array        : (parameter: any): string => `DataTypes.ARRAY(${cliterConfig.propertyTypesEquivalenceSequelizeTypes[parameter.type](parameter)})`,
    },
    defaultTypeLength: {
        bigint  : 20,
        char    : 127,
        int     : 10,
        password: 255,
        smallint: 6,
        varchar : 255,
    },
    quotationTypes: {
        'blob.long'  : true,
        'blob.medium': true,
        'blob.tiny'  : true,
        bigint       : false,
        blob         : true,
        boolean      : false,
        char         : true,
        date         : true,
        decimal      : false,
        enum         : false,  // only for MockType.SEED in src/@cliter/handlebars/helpers/mocker.ts without quotes, rest add quotes in /mocker.ts
        float        : false,
        id           : true,
        int          : false,
        json         : false,
        jsonb        : false,
        password     : true,
        smallint     : false,
        text         : true,
        timestamp    : true,
        varchar      : true,
    },
    fileTags: {
        ignoredFile       : '8ca93fe73cc6e48cde17e74342122d3b86210ff5',       // // ignored file
        ignoredGraphQLFile: '03b1aa4e5de61b13327591869a4c96d5f82de70c',       // # ignored file (for GraphQL)
        ignoredHtmlFile   : '4e6c548816bc0b2087633182f1e7e0f75ecba428',       // <!-- ignored file --> (for HTML)
    },
    compareActions: {
        deleteOriginAndLoadNext: 'Delete origin file and load next',
        ignore                 : 'Ignore the file to be overwritten in future uploads',
        replace                : 'Replace current file with origin file',
        selectFile             : 'Go to file selection',
        finish                 : 'Finish comparison and exit',
    },
    skipDirectories             : ['node_modules', 'dist', 'coverage', 'cliter'],
    avoidOverwritingFilesIfExist: [
        path.join('back', '@app', 'index.ts'),
        path.join('back', '@api', '__bounded_context_name__.module.ts'),
        path.join('front', 'module', '__bounded_context_name__.navigation.ts'),
        path.join('front', 'module', '__bounded_context_name__.module.ts'),
        path.join('front', 'module', '__bounded_context_name__.routes.ts'),
        path.join('front', 'module', '__bounded_context_name__.types.ts'),
        path.join('front', 'module', 'index.ts'),
        path.join('front', 'module', 'public-api.ts'),
        path.join('front', 'module-translations', 'en.json'),
        path.join('front', 'module-translations', 'es.json'),
    ],
    allowedRenderExtensions: ['.ts', '.js', '.json', '.graphql', '.env', '.md', '.txt', '.htm', '.html', '.yaml'],
    platformFromDeploy     : ['GitHub'],
    platformToDeploy       : ['Azure', 'Google Cloud', 'On Premise'],
    serviceToDeploy        : {
        back: {
            azure      : ['App Service'],
            googleCloud: ['App Engine'],
            onPremise  : ['Plesk'],
        },
        front: {
            googleCloud: ['App Engine'],
            onPremise  : ['Plesk'],
        },
    },
    backPackages: [
        'auditing',
        'azureAd',
        'common',
        'iam',
        'message',
        'oAuth',
        'queueManager',
        'whatsapp',
    ],
    frontPackages: [
        'auditing',
        'azureAd',
        'common',
        'environments',
        'iam',
        'message',
        'oAuth',
        'queueManager',
        'whatsapp',
    ],
};
