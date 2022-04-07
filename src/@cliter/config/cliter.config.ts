import * as path from 'node:path';

export interface CliterConfig
{
    dashboardContainer: string;
    dashboardTranslations: string;
    applicationsContainer: string;
    apiContainer: string;
    auroraCorePackage: string;
    auroraLocalPackage: string;
    configYamlVersion: string;
    lockJsonVersion: string;
    timestampFields: string[];
    deletedAtField: string[];
    sqlTypesEquivalenceJavascriptTypes: { [key: string]: string };
    sqlTypesEquivalenceApiTypes: { [key: string]: string };
    sqlTypesEquivalenceQraphqlTypes: { [key: string]: string };
    sqlTypesEquivalenceSequelizeTypes: { [key: string]: Function };
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
}

export const cliterConfig: CliterConfig =
{
    // dashboard
    dashboardContainer   : path.join('app', 'modules', 'admin', 'apps'),
    dashboardTranslations: path.join('assets', 'i18n'),

    // application
    applicationsContainer             : '@apps',
    apiContainer                      : '@api',
    auroraLocalPackage                : '@aurora',
    auroraCorePackage                 : 'aurora-ts-core',
    configYamlVersion                 : '0.0.1',
    lockJsonVersion                   : '0.0.1',
    timestampFields                   : ['createdAt', 'updatedAt', 'deletedAt'],
    deletedAtField                    : ['deletedAt'],
    sqlTypesEquivalenceJavascriptTypes: {
        varchar            : 'string',
        password           : 'string',
        char               : 'string',
        text               : 'string',
        enum               : 'string',
        tinyint            : 'number',
        'tinyint.unsigned' : 'number',
        int                : 'number',
        'int.unsigned'     : 'number',
        smallint           : 'number',
        'smallint.unsigned': 'number',
        decimal            : 'number',
        float              : 'number',
        boolean            : 'boolean',
        json               : 'any',
        id                 : 'string',
        timestamp          : 'string',
        manyToMany         : 'string[]',
    },
    sqlTypesEquivalenceApiTypes: {
        varchar            : 'String',
        password           : 'String',
        char               : 'String',
        text               : 'String',
        enum               : 'String',
        tinyint            : 'Number',
        'tinyint.unsigned' : 'Number',
        int                : 'Number',
        'int.unsigned'     : 'Number',
        smallint           : 'Number',
        'smallint.unsigned': 'Number',
        decimal            : 'Number',
        float              : 'Number',
        boolean            : 'Boolean',
        json               : 'Object',
        id                 : 'String',
        timestamp          : 'String',
        manyToMany         : '[String]',
    },
    sqlTypesEquivalenceQraphqlTypes: {
        varchar            : 'GraphQLString',
        password           : 'GraphQLString',
        char               : 'GraphQLString',
        text               : 'GraphQLString',
        enum               : 'GraphQLString',
        tinyint            : 'GraphQLInt',
        'tinyint.unsigned' : 'GraphQLInt',
        int                : 'GraphQLInt',
        'int.unsigned'     : 'GraphQLInt',
        smallint           : 'GraphQLInt',
        'smallint.unsigned': 'GraphQLInt',
        decimal            : 'GraphQLFloat',
        float              : 'GraphQLFloat',
        boolean            : 'GraphQLBoolean',
        json               : 'JSON',
        id                 : 'ID',
        timestamp          : 'GraphQLTimestamp',
        manyToMany         : '[ID]',
    },
    sqlTypesEquivalenceSequelizeTypes: {
        varchar            : (length: number): string => `DataTypes.STRING(${length?.toString()})`,
        password           : (length: number): string => `DataTypes.STRING(${length?.toString()})`,
        char               : (length: number): string => `DataTypes.CHAR(${length?.toString()})`,
        text               : (length: number): string => 'DataTypes.TEXT',
        enum               : (values: string): string => `DataTypes.ENUM(${values})`,
        tinyint            : (length: number): string => 'DataTypes.TINYINT',
        'tinyint.unsigned' : (length: number): string => 'DataTypes.TINYINT.UNSIGNED',
        int                : (length: number): string => 'DataTypes.INTEGER',
        'int.unsigned'     : (length: number): string => 'DataTypes.INTEGER.UNSIGNED',
        smallint           : (length: number): string => 'DataTypes.SMALLINT',
        'smallint.unsigned': (length: number): string => 'DataTypes.SMALLINT.UNSIGNED',
        decimal            : (decimals: number[]): string => `DataTypes.DECIMAL(${decimals.join(',')})`,
        float              : (length: number): string => 'DataTypes.FLOAT',
        boolean            : (length: number): string => 'DataTypes.BOOLEAN',
        json               : (length: number): string => 'DataTypes.JSON',
        id                 : (length: number): string => 'DataTypes.UUID',
        timestamp          : (length: number): string => 'DataTypes.DATE',
    },
    defaultTypeLength: {
        varchar            : 255,
        password           : 255,
        char               : 127,
        tinyint            : 2,
        'tinyint.unsigned' : 2,
        int                : 10,
        'int.unsigned'     : 10,
        smallint           : 6,
        'smallint.unsigned': 6,
    },
    quotationTypes: {
        varchar            : true,
        password           : true,
        char               : true,
        text               : true,
        enum               : true,
        tinyint            : false,
        'tinyint.unsigned' : false,
        int                : false,
        'int.unsigned'     : false,
        smallint           : false,
        'smallint.unsigned': false,
        decimal            : false,
        float              : false,
        boolean            : false,
        json               : false,
        id                 : true,
        timestamp          : true,
    },
    fileTags: {
        ignoredFile       : '8ca93fe73cc6e48cde17e74342122d3b86210ff5',       // // ignored file
        ignoredGraphQLFile: '03b1aa4e5de61b13327591869a4c96d5f82de70c',       // # ignored file (for GraphQL)
        ignoredHtmlFile   : '4e6c548816bc0b2087633182f1e7e0f75ecba428',       // <!-- ignored file --> (for HTML)
    },
    compareActions: {
        deleteOrigin: 'Delete origin file and load next',
        ignore      : 'Ignore the file to be overwritten in future uploads',
        return      : 'Go back',
        finish      : 'Finish comparison and exit',
    },
    skipDirectories             : ['node_modules', 'dist', 'coverage', 'cliter'],
    avoidOverwritingFilesIfExist: [
        path.join('module', 'index.ts'),
        path.join('api', '__bounded_context_name__.module.ts'),
        path.join('dashboard-module', '__bounded_context_name__.menu.ts'),
        path.join('dashboard-module', '_bounded_context_name__.module.ts'),
        path.join('dashboard-module', '__bounded_context_name__.routing.ts'),
        path.join('dashboard-module', '__bounded_context_name__.types.ts'),
        path.join('dashboard-module-translations', 'en.json'),
        path.join('dashboard-module-translations', 'es.json'),
    ],
    allowedRenderExtensions: ['.ts', '.js', '.json', '.graphql', '.env', '.md', '.txt', '.htm', '.html', '.yaml'],
    platformFromDeploy     : ['GitHub'],
    platformToDeploy       : ['Azure', 'Google Cloud'],
    serviceToDeploy        : {
        back: {
            azure      : ['App Service'],
            googleCloud: ['App Engine'],
        },
        front: {
            googleCloud: ['App Engine'],
        },
    },
};
