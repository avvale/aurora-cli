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
    sqlTypesEquivalenceSwaggerTypes: { [key: string]: string };
    sqlTypesEquivalenceDtoTypes: { [key: string]: string };
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
    packages: string[];
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
        'int.unsigned'     : 'number',
        'smallint.unsigned': 'number',
        'tinyint.unsigned' : 'number',
        boolean            : 'boolean',
        char               : 'string',
        date               : 'string',
        decimal            : 'number',
        enum               : 'string',
        float              : 'number',
        id                 : 'string',
        int                : 'number',
        json               : 'any',
        manyToMany         : 'string[]',
        password           : 'string',
        smallint           : 'number',
        text               : 'string',
        timestamp          : 'string',
        tinyint            : 'number',
        varchar            : 'string',
    },
    sqlTypesEquivalenceSwaggerTypes: {
        'int.unsigned'     : 'Number',
        'smallint.unsigned': 'Number',
        'tinyint.unsigned' : 'Number',
        boolean            : 'Boolean',
        char               : 'String',
        date               : 'String',
        decimal            : 'Number',
        enum               : 'String',
        float              : 'Number',
        id                 : 'String',
        int                : 'Number',
        json               : 'Object',
        manyToMany         : '[String]',
        password           : 'String',
        smallint           : 'Number',
        text               : 'String',
        timestamp          : 'String',
        tinyint            : 'Number',
        varchar            : 'String',
    },
    sqlTypesEquivalenceDtoTypes: {
        'int.unsigned'     : 'number',
        'smallint.unsigned': 'number',
        'tinyint.unsigned' : 'number',
        boolean            : 'boolean',
        char               : 'string',
        date               : 'string',
        decimal            : 'number',
        enum               : 'string',
        float              : 'number',
        id                 : 'string',
        int                : 'number',
        json               : 'any',
        manyToMany         : 'string[]',
        password           : 'string',
        smallint           : 'number',
        text               : 'string',
        timestamp          : 'string',
        tinyint            : 'number',
        varchar            : 'string',
    },
    sqlTypesEquivalenceQraphqlTypes: {
        'int.unsigned'     : 'GraphQLInt',
        'smallint.unsigned': 'GraphQLInt',
        'tinyint.unsigned' : 'GraphQLInt',
        boolean            : 'GraphQLBoolean',
        char               : 'GraphQLString',
        date               : 'GraphQLISODateTime',
        decimal            : 'GraphQLFloat',
        enum               : 'GraphQLString',
        float              : 'GraphQLFloat',
        id                 : 'ID',
        int                : 'GraphQLInt',
        json               : 'JSON',
        manyToMany         : '[ID]',
        password           : 'GraphQLString',
        smallint           : 'GraphQLInt',
        text               : 'GraphQLString',
        timestamp          : 'GraphQLTimestamp',
        tinyint            : 'GraphQLInt',
        varchar            : 'GraphQLString',
    },
    sqlTypesEquivalenceSequelizeTypes: {
        'int.unsigned'     : (length: number): string => 'DataTypes.INTEGER.UNSIGNED',
        'smallint.unsigned': (length: number): string => 'DataTypes.SMALLINT.UNSIGNED',
        'tinyint.unsigned' : (length: number): string => 'DataTypes.TINYINT.UNSIGNED',
        boolean            : (length: number): string => 'DataTypes.BOOLEAN',
        char               : (length: number): string => `DataTypes.CHAR(${length?.toString()})`,
        date               : (length: number): string => 'DataTypes.DATE',
        decimal            : (decimals: number[]): string => `DataTypes.DECIMAL(${decimals.join(',')})`,
        enum               : (values: string): string => `DataTypes.ENUM(${values})`,
        float              : (length: number): string => 'DataTypes.FLOAT',
        id                 : (length: number): string => 'DataTypes.UUID',
        int                : (length: number): string => 'DataTypes.INTEGER',
        json               : (length: number): string => 'DataTypes.JSON',
        password           : (length: number): string => `DataTypes.STRING(${length?.toString()})`,
        smallint           : (length: number): string => 'DataTypes.SMALLINT',
        text               : (length: number): string => 'DataTypes.TEXT',
        timestamp          : (length: number): string => 'DataTypes.DATE',
        tinyint            : (length: number): string => 'DataTypes.TINYINT',
        varchar            : (length: number): string => `DataTypes.STRING(${length?.toString()})`,
    },
    defaultTypeLength: {
        'int.unsigned'     : 10,
        'smallint.unsigned': 6,
        'tinyint.unsigned' : 2,
        char               : 127,
        int                : 10,
        password           : 255,
        smallint           : 6,
        tinyint            : 2,
        varchar            : 255,
    },
    quotationTypes: {
        'int.unsigned'     : false,
        'smallint.unsigned': false,
        'tinyint.unsigned' : false,
        boolean            : false,
        char               : true,
        date               : true,
        decimal            : false,
        enum               : false,  // only for MockType.SEED in src/@cliter/handlebars/helpers/mocker.ts without quotes, rest add quotes in /mocker.ts
        float              : false,
        id                 : true,
        int                : false,
        json               : false,
        password           : true,
        smallint           : false,
        text               : true,
        timestamp          : true,
        tinyint            : false,
        varchar            : true,
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
        path.join('back', 'module', 'index.ts'),
        path.join('back', 'api', '__bounded_context_name__.module.ts'),
        path.join('front', 'module', '__bounded_context_name__.menu.ts'),
        path.join('front', 'module', '__bounded_context_name__.module.ts'),
        path.join('front', 'module', '__bounded_context_name__.routing.ts'),
        path.join('front', 'module', '__bounded_context_name__.types.ts'),
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
        },
    },
    packages: [
        'oAuth',
        'common',
    ],
};
