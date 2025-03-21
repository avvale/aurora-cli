/* eslint-disable max-params */
import * as fs from 'node:fs';
import * as path from 'node:path';
import { ArrayLiteralExpression, CallExpression, Decorator, IndentationText, InitializerExpressionGetableNode, ObjectLiteralExpression, Project, QuoteKind, SourceFile, StringLiteral } from 'ts-morph';
import { NewLineKind, SyntaxKind } from 'typescript';
import { CliterConfig, cliterConfig } from '../../config';
import { Property } from '../../types';
import { ObjectTools } from '../object-tools';
import { getForeignRelationshipProperties, getGraphqlInputProperties, getGraphqlProperties, getWithoutTimestampsProperties, hasI18nProperties } from '../properties.functions';
import { getPropertyJavascriptCreateType, getPropertyJavascriptType, getPropertyJavascriptUpdateType } from '../property.functions';
import { ArrayDriver } from './drivers/array.driver';
import { ImportDriver } from './drivers/import.driver';
import { InterfaceDriver } from './drivers/interface.driver';
import { getInitializer } from './functions';

export class CodeWriter
{
    private project: Project;

    constructor(
        public readonly srcDirectory: string,
        public readonly appDirectory: string,
        public readonly apiDirectory: string,
        public readonly boundedContextName: string,
        public readonly moduleName: string,
        public readonly moduleNames: string,
        public readonly aggregateName: string,
        public readonly hasI18n: boolean,
    )
    {
        this.project = new Project({
            tsConfigFilePath    : path.join(process.cwd(), 'tsconfig.json'),
            // these are the defaults
            manipulationSettings: {
                // TwoSpaces, FourSpaces, EightSpaces, or Tab
                indentationText                : IndentationText.FourSpaces,
                // LineFeed or CarriageReturnLineFeed
                newLineKind                    : NewLineKind.LineFeed,
                // Single or Double
                quoteKind                      : QuoteKind.Single,
                // Whether to change shorthand property assignments to property assignments
                // and add aliases to import & export specifiers (see more information in
                // the renaming section of the documentation).
                usePrefixAndSuffixTextForRename: false,
                // Whether to use trailing commas in multi-line scenarios where trailing
                // commas would be used.
                useTrailingCommas              : false,
            },
        });
    }

    // back
    generateBackAppBoundedContextReferences(
        properties: Property[],
        excluded: string[] = [],
    ): void
    {
        if (excluded.includes('src/@app/**')) return;

        const sourceFile = this.project.addSourceFileAtPath(path.join(process.cwd(), this.srcDirectory, this.appDirectory, this.boundedContextName.toKebabCase(), 'public-api.ts'));

        // register import in @app/boundedContext/index.ts
        ImportDriver.createImportItems(
            sourceFile,
            `./${this.moduleName.toKebabCase()}`,
            [
                `${this.boundedContextName.toPascalCase()}${this.moduleName.toPascalCase()}Handlers`,
                `${this.boundedContextName.toPascalCase()}${this.moduleName.toPascalCase()}Services`,
                `${this.boundedContextName.toPascalCase()}${this.moduleName.toPascalCase()}Model`,
                `${this.boundedContextName.toPascalCase()}I${this.moduleName.toPascalCase()}Repository`,
                `${this.boundedContextName.toPascalCase()}Sequelize${this.moduleName.toPascalCase()}Repository`,
                `${this.boundedContextName.toPascalCase()}${this.moduleName.toPascalCase()}Sagas`,
            ],
        );

        // handlers
        ArrayDriver.addArrayItem(
            sourceFile,
            `...${this.boundedContextName.toPascalCase()}${this.moduleName.toPascalCase()}Handlers`,
            `${this.boundedContextName.toPascalCase()}Handlers`,
        );

        // services
        ArrayDriver.addArrayItem(
            sourceFile,
            `...${this.boundedContextName.toPascalCase()}${this.moduleName.toPascalCase()}Services`,
            `${this.boundedContextName.toPascalCase()}Services`,
        );

        // models
        ArrayDriver.addArrayItem(
            sourceFile,
            `${this.boundedContextName.toPascalCase()}${this.moduleName.toPascalCase()}Model`,
            `${this.boundedContextName.toPascalCase()}Models`,
        );

        // repositories
        ArrayDriver.addArrayItem(
            sourceFile,
            `
{
    provide : ${this.boundedContextName.toPascalCase()}I${this.moduleName.toPascalCase()}Repository,
    useClass: ${this.boundedContextName.toPascalCase()}Sequelize${this.moduleName.toPascalCase()}Repository,
}`,
            `${this.boundedContextName.toPascalCase()}Repositories`,
        );

        // sagas
        ArrayDriver.addArrayItem(
            sourceFile,
            `${this.boundedContextName.toPascalCase()}${this.moduleName.toPascalCase()}Sagas`,
            `${this.boundedContextName.toPascalCase()}Sagas`,
        );

        // add i18n registers
        if (hasI18nProperties(properties))
        {
            // register import
            ImportDriver.createImportItems(
                sourceFile,
                `./${this.moduleName.toKebabCase()}`,
                [
                    `${this.boundedContextName.toPascalCase()}${this.moduleName.toPascalCase()}I18nModel`,
                    `${this.boundedContextName.toPascalCase()}I${this.moduleName.toPascalCase()}I18nRepository`,
                    `${this.boundedContextName.toPascalCase()}Sequelize${this.moduleName.toPascalCase()}I18nRepository`,
                ],
            );

            // models
            ArrayDriver.addArrayItem(
                sourceFile,
                `${this.boundedContextName.toPascalCase()}${this.moduleName.toPascalCase()}I18nModel`,
                `${this.boundedContextName.toPascalCase()}Models`,
            );

            // repositories
            ArrayDriver.addArrayItem(
                sourceFile,
                `
{
    provide : ${this.boundedContextName.toPascalCase()}I${this.moduleName.toPascalCase()}I18nRepository,
    useClass: ${this.boundedContextName.toPascalCase()}Sequelize${this.moduleName.toPascalCase()}I18nRepository
}`,
                `${this.boundedContextName.toPascalCase()}Repositories`,
            );
        }

        sourceFile?.saveSync();
    }

    declareBackApplicationItemsInModule(): void
    {
        // get decorator arguments
        const sourceFile = this.project.addSourceFileAtPath(path.join(process.cwd(), this.srcDirectory, this.apiDirectory, this.boundedContextName.toKebabCase(), `${this.boundedContextName.toKebabCase()}.module.ts`));
        const moduleDecoratorArguments = this.getModuleDecoratorArguments(sourceFile, `${this.boundedContextName.toPascalCase()}Module`, 'Module');

        // providers
        const providers: InitializerExpressionGetableNode = moduleDecoratorArguments.getProperty('providers') as InitializerExpressionGetableNode;
        const providersArray: ArrayLiteralExpression = <ArrayLiteralExpression>getInitializer(providers);

        // controllers
        const controllers: InitializerExpressionGetableNode = moduleDecoratorArguments.getProperty('controllers') as InitializerExpressionGetableNode;
        const controllersArray = <ArrayLiteralExpression>getInitializer(controllers);

        // register imports from bounded context from @app
        ImportDriver.createImportItems(
            sourceFile,
            `${cliterConfig.appContainer}/${this.boundedContextName.toKebabCase()}`,
            [
                `${this.boundedContextName.toPascalCase()}Models`,
                `${this.boundedContextName.toPascalCase()}Handlers`,
                `${this.boundedContextName.toPascalCase()}Services`,
                `${this.boundedContextName.toPascalCase()}Repositories`,
                `${this.boundedContextName.toPascalCase()}Sagas`,
            ],
        );

        // register import for controllers and providers from @api
        ImportDriver.createImportItems(
            sourceFile,
            `./${this.moduleName.toKebabCase()}`,
            [
                `${this.boundedContextName.toPascalCase()}${this.moduleName.toPascalCase()}ApiControllers`,
                `${this.boundedContextName.toPascalCase()}${this.moduleName.toPascalCase()}ApiResolvers`,
                `${this.boundedContextName.toPascalCase()}${this.moduleName.toPascalCase()}ApiHandlers`,
                `${this.boundedContextName.toPascalCase()}${this.moduleName.toPascalCase()}ApiServices`,
            ],
        );

        // add model to ORM array argument
        const modelArrayArgument = this.getModelArrayArgument(moduleDecoratorArguments);
        ArrayDriver.addArrayItem(
            sourceFile,
            `...${this.boundedContextName.toPascalCase()}Models`,
            modelArrayArgument,
        );

        // add services to providers
        ArrayDriver.addArrayItems(
            sourceFile,
            [
                // from @app
                `...${this.boundedContextName.toPascalCase()}Handlers`,
                `...${this.boundedContextName.toPascalCase()}Services`,
                `...${this.boundedContextName.toPascalCase()}Repositories`,
                `...${this.boundedContextName.toPascalCase()}Sagas`,
                // from @api
                `...${this.boundedContextName.toPascalCase()}${this.moduleName.toPascalCase()}ApiResolvers`,
                `...${this.boundedContextName.toPascalCase()}${this.moduleName.toPascalCase()}ApiHandlers`,
                `...${this.boundedContextName.toPascalCase()}${this.moduleName.toPascalCase()}ApiServices`,
            ],
            providersArray,
        );

        // add controller to controllers array
        ArrayDriver.addArrayItem(
            sourceFile,
            `...${this.boundedContextName.toPascalCase()}${this.moduleName.toPascalCase()}ApiControllers`,
            controllersArray,
        );

        sourceFile?.saveSync();
    }

    generateBackTestingForeignReferences(properties: Property[]): void
    {
        // get foreign relationship
        const foreignRelationships = getForeignRelationshipProperties(properties, this.boundedContextName);

        // check that exist bounded context folder
        if (!fs.existsSync(path.join(process.cwd(), 'cliter', this.boundedContextName.toKebabCase()))) return;

        // get all yaml files to get all modules managed by cli
        const yamlFiles = fs.readdirSync(path.join(process.cwd(), 'cliter', this.boundedContextName.toKebabCase()));

        for (const foreignRelationship of foreignRelationships)
        {
            if (!foreignRelationship.relationship?.modulePath) return;

            const foreignBoundedContextName = foreignRelationship.relationship?.modulePath.split('/')[0];

            for (const yamlFile of yamlFiles)
            {
                // get file name of e2e test
                const e2eTestFile = yamlFile.replace(cliterConfig.schemaDefinitionExtension, '.e2e-spec.ts');

                const e2eTestPath = path.join(process.cwd(), 'test', 'acceptance', this.boundedContextName.toKebabCase(), e2eTestFile);

                // check that exist e2e test file
                if (fs.existsSync(e2eTestPath))
                {
                    // get sourceFile of e2e test
                    const sourceFile = this.project.addSourceFileAtPath(e2eTestPath);

                    // register import in e2e test
                    /* ImportDriver.createImportItems(
                        sourceFile,
                        foreignRelationship.relationship.packageName ?
                            foreignRelationship.relationship.packageName :
                            `./../../../src/${cliterConfig.apiContainer}/${foreignBoundedContextName.toKebabCase()}/${foreignBoundedContextName.toKebabCase()}.module`,
                        [
                            `${foreignBoundedContextName.toPascalCase()}Module`,
                        ],
                    ); */

                    // disable import foreign modules, can be micro-services
                    // register import in import array
                    /* ArrayDriver.addArrayItem(
                        sourceFile,
                        `${foreignBoundedContextName.toPascalCase()}Module`,
                        'importForeignModules',
                    ); */

                    sourceFile?.saveSync();
                }
            }
        }
    }

    /****************************************************************
     * Add import and declare application items in bounded context
     * module.
     *
     * @return void
     ****************************************************************/
    declareBackBoundedContextModuleInApplicationModule(): void
    {
        const sourceFile = this.project.addSourceFileAtPath(path.join(process.cwd(), this.srcDirectory, 'app.module.ts'));
        const moduleDecoratorArguments = this.getModuleDecoratorArguments(sourceFile, 'AppModule', 'Module');
        const modules: string[] = this.getImportedDeclarations(sourceFile);

        if (!modules.includes(`${this.boundedContextName.toPascalCase()}Module`))
        {
            // import module
            ImportDriver.createImportItems(
                sourceFile,
                `${cliterConfig.apiContainer}/${this.boundedContextName.toKebabCase()}/${this.boundedContextName.toKebabCase()}.module`,
                [`${this.boundedContextName.toPascalCase()}Module`],
            );

            // register module
            const importsArgument: InitializerExpressionGetableNode = moduleDecoratorArguments.getProperty('imports') as InitializerExpressionGetableNode;
            const importsArray = <ArrayLiteralExpression>getInitializer(importsArgument);
            ArrayDriver.addArrayItems(
                sourceFile,
                [
                    `${this.boundedContextName.toPascalCase()}Module`,
                ],
                importsArray,
            );
        }

        sourceFile?.saveSync();
    }

    // front
    generateFrontInterface(
        properties: Property[],
        {
            overwrite = false,
        }: {
            overwrite?: boolean;
        } = {},
    ): void
    {
        const sourceFile = this.project.addSourceFileAtPath(path.join(process.cwd(), this.srcDirectory, cliterConfig.dashboardContainer, this.boundedContextName.toKebabCase(), `${this.boundedContextName.toKebabCase()}.types.ts`));

        // add object type
        InterfaceDriver.addInterface(
            sourceFile,
            `${this.boundedContextName.toPascalCase()}${this.moduleName.toPascalCase()}`,
            getGraphqlProperties(properties)
                // avoid duplicated properties from i18n table, id, createdAt, updatedAt, deletedAt
                .filter(property =>
                    !(
                        property.isI18n &&
                        (
                            property.name === 'id' ||
                            property.name === 'createdAt' ||
                            property.name === 'updatedAt' ||
                            property.name === 'deletedAt'
                        )
                    ),
                )
                .map(property => ({
                    name: property.name.toCamelCase() + (property.nullable ? '?' : ''),
                    type: getPropertyJavascriptType(property, cliterConfig),
                })),
            { overwrite },
        );

        // add create object type
        InterfaceDriver.addInterface(
            sourceFile,
            `${this.boundedContextName.toPascalCase()}Create${this.moduleName.toPascalCase()}`,
            getGraphqlInputProperties(properties)
                // avoid duplicated properties from i18n table, id
                .filter(property =>
                    !(
                        property.isI18n &&
                        (
                            property.name === 'id'
                        )
                    ),
                )
                .map(property => ({
                    name: property.name.toCamelCase() + (property.nullable ? '?' : ''),
                    type: getPropertyJavascriptCreateType(property, cliterConfig),
                })),
            { overwrite },
        );

        // add update object by id type
        InterfaceDriver.addInterface(
            sourceFile,
            `${this.boundedContextName.toPascalCase()}Update${this.moduleName.toPascalCase()}ById`,
            getGraphqlInputProperties(properties)
                // avoid duplicated properties from i18n table, id
                .filter(property =>
                    !(
                        property.isI18n &&
                        (
                            property.name === 'id'
                        )
                    ),
                )
                .map(property => ({
                    name: property.name.toCamelCase() + (property.name === 'id' ? '' : '?'),
                    type: getPropertyJavascriptType(property, cliterConfig),
                })),
            { overwrite },
        );

        // add update objects type
        InterfaceDriver.addInterface(
            sourceFile,
            `${this.boundedContextName.toPascalCase()}Update${this.moduleNames.toPascalCase()}`,
            getGraphqlInputProperties(properties)
                // avoid duplicated properties from i18n table, id
                .filter(property =>
                    !(
                        property.isI18n &&
                        (
                            property.name === 'id'
                        )
                    ),
                )
                .map(property => ({
                    name: property.name.toCamelCase() + '?',
                    type: getPropertyJavascriptUpdateType(property, cliterConfig),
                })),
            { overwrite },
        );

        sourceFile?.saveSync();
    }

    generateFrontRoutes(index = 0): void
    {
        const sourceFile = this.project.addSourceFileAtPath(path.join(process.cwd(), this.srcDirectory, cliterConfig.dashboardContainer, this.boundedContextName.toKebabCase(), `${this.boundedContextName.toKebabCase()}.routes.ts`));
        const defaultExportDeclarations = sourceFile.getExportedDeclarations();
        const routesArray = (defaultExportDeclarations.get('default') as ArrayLiteralExpression[])[0];
        const objectRoute = routesArray.getElements()[index] as ObjectLiteralExpression;
        const childrenRoutes = objectRoute.getPropertyOrThrow('children') as InitializerExpressionGetableNode;
        const childrenRoutesArray = <ArrayLiteralExpression>getInitializer(childrenRoutes);

        // export list component
        ImportDriver.createImportItems(
            sourceFile,
            `./${this.moduleName.toKebabCase()}/${this.moduleName.toKebabCase()}-list.component`,
            [`${this.moduleName.toPascalCase()}ListComponent`],
        );

        // export detail component
        ImportDriver.createImportItems(
            sourceFile,
            `./${this.moduleName.toKebabCase()}/${this.moduleName.toKebabCase()}-detail.component`,
            [`${this.moduleName.toPascalCase()}DetailComponent`],
        );

        // export resolvers
        ImportDriver.createImportItems(
            sourceFile,
            `./${this.moduleName.toKebabCase()}/${this.moduleName.toKebabCase()}.resolvers`,
            [
                `${this.moduleName.toCamelCase()}EditResolver`,
                `${this.moduleName.toCamelCase()}NewResolver`,
                `${this.moduleName.toCamelCase()}PaginationResolver`,
            ],
        );

        // add route to list items
        ArrayDriver.addArrayItem(
            sourceFile,
            `{ path: '${this.moduleName.toKebabCase()}', component: ${this.moduleName.toPascalCase()}ListComponent, resolve: { data: ${this.moduleName.toCamelCase()}PaginationResolver }, data: { permission: '${this.boundedContextName.toCamelCase()}.${this.moduleName.toCamelCase()}.get' }}`,
            childrenRoutesArray,
            (item: string, array: ArrayLiteralExpression | undefined) =>
            {
                const foundItem = (array?.getElements() as ObjectLiteralExpression[]).find(item =>
                {
                    return `'${this.moduleName.toKebabCase()}'` === (<StringLiteral>getInitializer((item.getPropertyOrThrow('path') as InitializerExpressionGetableNode))).getText();
                });

                return Boolean(foundItem);
            },
        );

        // add route to new item
        ArrayDriver.addArrayItem(
            sourceFile,
            `{ path: '${this.moduleName.toKebabCase()}/new', component: ${this.moduleName.toPascalCase()}DetailComponent, resolve: { data: ${this.moduleName.toCamelCase()}NewResolver }, data: { permission: '${this.boundedContextName.toCamelCase()}.${this.moduleName.toCamelCase()}.create' }},`,
            childrenRoutesArray,
            (item: string, array: ArrayLiteralExpression | undefined) =>
            {
                const foundItem = (array?.getElements() as ObjectLiteralExpression[]).find(item =>
                {
                    return `'${this.moduleName.toKebabCase()}/new'` === (<StringLiteral>getInitializer((item.getPropertyOrThrow('path') as InitializerExpressionGetableNode))).getText();
                });

                return Boolean(foundItem);
            },
        );

        // if module has i18n
        if (this.hasI18n)
        {
            // add route to new i18n item
            ArrayDriver.addArrayItem(
                sourceFile,
                `{ path: '${this.moduleName.toKebabCase()}/new/:id/:langId', component: ${this.moduleName.toPascalCase()}DetailComponent, resolve: { data: ${this.moduleName.toCamelCase()}NewResolver }, data: { permission: '${this.boundedContextName.toCamelCase()}.${this.moduleName.toCamelCase()}.create' }},`,
                childrenRoutesArray,
                (item: string, array: ArrayLiteralExpression | undefined) =>
                {
                    const foundItem = (array?.getElements() as ObjectLiteralExpression[]).find(item =>
                    {
                        return `'${this.moduleName.toKebabCase()}/new/:id/:langId'` === (<StringLiteral>getInitializer((item.getPropertyOrThrow('path') as InitializerExpressionGetableNode))).getText();
                    });

                    return Boolean(foundItem);
                },
            );

            // add route to edit item
            ArrayDriver.addArrayItem(
                sourceFile,
                `{ path: '${this.moduleName.toKebabCase()}/edit/:id/:langId', component: ${this.moduleName.toPascalCase()}DetailComponent, resolve: { data: ${this.moduleName.toCamelCase()}EditResolver }, data: { permission: '${this.boundedContextName.toCamelCase()}.${this.moduleName.toCamelCase()}.get' }},`,
                childrenRoutesArray,
                (item: string, array: ArrayLiteralExpression | undefined) =>
                {
                    const foundItem = (array?.getElements() as ObjectLiteralExpression[]).find(item =>
                    {
                        return `'${this.moduleName.toKebabCase()}/edit/:id/:langId'` === (<StringLiteral>getInitializer((item.getPropertyOrThrow('path') as InitializerExpressionGetableNode))).getText();
                    });

                    return Boolean(foundItem);
                },
            );

            sourceFile?.saveSync();

            return;
        }

        // add route to edit item
        ArrayDriver.addArrayItem(
            sourceFile,
            `{ path: '${this.moduleName.toKebabCase()}/edit/:id', component: ${this.moduleName.toPascalCase()}DetailComponent, resolve: { data: ${this.moduleName.toCamelCase()}EditResolver }, data: { permission: '${this.boundedContextName.toCamelCase()}.${this.moduleName.toCamelCase()}.get' }},`,
            childrenRoutesArray,
            (item: string, array: ArrayLiteralExpression | undefined) =>
            {
                const foundItem = (array?.getElements() as ObjectLiteralExpression[]).find(item =>
                {
                    return `'${this.moduleName.toKebabCase()}/edit/:id'` === (<StringLiteral>getInitializer((item.getPropertyOrThrow('path') as InitializerExpressionGetableNode))).getText();
                });

                return Boolean(foundItem);
            },
        );

        sourceFile?.saveSync();
    }

    registerFrontNavigation(): void
    {
        const sourceFile = this.project.addSourceFileAtPath(path.join(process.cwd(), this.srcDirectory, cliterConfig.adminContainer, 'admin.navigation.ts'));

        // import bounded context navigation
        ImportDriver.createImportItems(
            sourceFile,
            `./apps/${this.boundedContextName.toKebabCase()}/${this.boundedContextName.toKebabCase()}.navigation`,
            [`${this.boundedContextName.toCamelCase()}Navigation`],
        );

        // add to adminNavigation navigation array the bounded context navigation
        ArrayDriver.addArrayItem(
            sourceFile,
            `${this.boundedContextName.toCamelCase()}Navigation`,
            'adminNavigation',
        );

        sourceFile?.saveSync();
    }

    // declare front components for application with not standalone components
    // from angular v16 is not necessary to declare components in module
    declareFrontComponents(): void
    {
        const sourceFile = this.project.addSourceFileAtPath(path.join(process.cwd(), this.srcDirectory, cliterConfig.dashboardContainer, this.boundedContextName.toKebabCase(), `${this.boundedContextName.toKebabCase()}.module.ts`));
        const moduleDecoratorArguments = this.getModuleDecoratorArguments(sourceFile, `${this.boundedContextName.toPascalCase()}Module`, 'NgModule');

        // declarations
        const declarations: InitializerExpressionGetableNode = moduleDecoratorArguments.getProperty('declarations') as InitializerExpressionGetableNode;
        const declarationsArray: ArrayLiteralExpression = <ArrayLiteralExpression>getInitializer(declarations);

        // export list component
        ImportDriver.createImportItems(
            sourceFile,
            `./${this.moduleName.toKebabCase()}/${this.moduleName.toKebabCase()}-list.component`,
            [`${this.moduleName.toPascalCase()}ListComponent`],
        );

        // export detail component
        ImportDriver.createImportItems(
            sourceFile,
            `./${this.moduleName.toKebabCase()}/${this.moduleName.toKebabCase()}-detail.component`,
            [`${this.moduleName.toPascalCase()}DetailComponent`],
        );

        ArrayDriver.addArrayItems(
            sourceFile,
            [
                `${this.moduleName.toPascalCase()}DetailComponent`,
                `${this.moduleName.toPascalCase()}ListComponent`,
            ],
            declarationsArray,
        );

        sourceFile?.saveSync();
    }

    declareFrontBoundedContext(index = 5): void
    {
        const sourceFile = this.project.addSourceFileAtPath(path.join(process.cwd(), this.srcDirectory, 'app', 'app.routes.ts'));

        const appRoutes = sourceFile.getVariableDeclarationOrThrow('appRoutes');
        const appRoutesArray = <ArrayLiteralExpression>getInitializer(appRoutes);
        const objectRoute = appRoutesArray.getElements()[index] as ObjectLiteralExpression;
        const childrenRoutes = objectRoute.getPropertyOrThrow('children') as InitializerExpressionGetableNode;
        const childrenRoutesArray = <ArrayLiteralExpression>getInitializer(childrenRoutes);
        const childrenRoutesElements = childrenRoutesArray.getElements() as ObjectLiteralExpression[];

        // avoid duplicated declaration
        for (const element of childrenRoutesElements)
        {
            const pathProperty = element.getPropertyOrThrow('path') as InitializerExpressionGetableNode;
            const pathString = <StringLiteral>getInitializer(pathProperty);

            if (pathString.getText() === `'${this.boundedContextName.toKebabCase()}'`) return;
        }

        // set routes
        // TODO, replace addElement with ArrayDriver.addArrayItems
        childrenRoutesArray?.addElement(
            `{ path: '${this.boundedContextName.toKebabCase()}', loadChildren: () => import('app/modules/admin/apps/${this.boundedContextName.toKebabCase()}/${this.boundedContextName.toKebabCase()}.routes') },`
            , { useNewLines: true });

        sourceFile?.saveSync();
    }

    // eslint-disable-next-line max-params
    // TODO, refactorizar a función
    generateFrontNavigation(
        cliterConfig: CliterConfig,
        srcDirectory: string,
        boundedContextName: string,
        moduleName: string,
        moduleNames: string,
        outlineIcon?: string,
    ): void
    {
        const sourceFile = this.project.addSourceFileAtPath(path.join(process.cwd(), srcDirectory, cliterConfig.dashboardContainer, boundedContextName.toKebabCase(), `${boundedContextName.toKebabCase()}.navigation.ts`));
        const navigation = sourceFile.getVariableDeclarationOrThrow(boundedContextName.toCamelCase() + 'Navigation');
        const navigationObject = <ObjectLiteralExpression>getInitializer(navigation);
        const childrenProperty = navigationObject.getPropertyOrThrow('children') as InitializerExpressionGetableNode;
        const childrenArrayNavigation = <ArrayLiteralExpression>getInitializer(childrenProperty);
        const navigationElements = childrenArrayNavigation.getElements() as ObjectLiteralExpression[];

        // avoid duplicated declaration
        for (const element of navigationElements)
        {
            const pathProperty = element.getPropertyOrThrow('id') as InitializerExpressionGetableNode;
            const pathString = <StringLiteral>getInitializer(pathProperty);

            if (pathString.getText() === `'${moduleName.toCamelCase()}'`) return;
        }

        // set routes
        ArrayDriver.addArrayItem(
            sourceFile,
            `{
    id: '${moduleNames.toCamelCase()}',
    title: '${moduleName.toPascalCase()}',
    type: 'basic',
    icon: '${outlineIcon || 'heroicons_outline:tag'}',
    link: '/${boundedContextName.toKebabCase()}/${moduleName.toKebabCase()}',
},`,
            childrenArrayNavigation,
            (item: string, array: ArrayLiteralExpression | undefined) =>
            {
                const foundItem = (array?.getElements() as ObjectLiteralExpression[]).find(item =>
                {
                    return `'${moduleNames.toCamelCase()}'` === (<StringLiteral>getInitializer((item.getPropertyOrThrow('id') as InitializerExpressionGetableNode))).getText();
                });

                return Boolean(foundItem);
            },
        );

        sourceFile?.saveSync();
    }

    generateFrontTranslations(properties: Property[], langCode: string): void
    {
        const translationObject = require(path.join(process.cwd(), cliterConfig.dashboardTranslations, this.boundedContextName.toKebabCase(), langCode + '.json'));

        // get names to translate
        const names = getWithoutTimestampsProperties(properties)
            .filter(property => property.name !== 'id')
            .map(property => property.name);

        // add module name/s to translate
        names.push(this.moduleName, this.moduleNames);

        for (const name of names)
        {
            // avoid overwriting existing properties
            if (translationObject[name.toPascalCase()] === undefined)
            {
                translationObject[name.toPascalCase()] = name.toPascalCase();
            }
        }

        // sort object by keys
        const newTranslationObject = ObjectTools.sortByKeys(translationObject);

        fs.writeFileSync(path.join(process.cwd(), cliterConfig.dashboardTranslations, this.boundedContextName.toKebabCase(), langCode + '.json'), JSON.stringify(newTranslationObject, null, 4));
    }

    generateFrontNavigationTranslation(langCode: string): void
    {
        const translationObject = require(path.join(process.cwd(), cliterConfig.dashboardTranslations, 'navigation', langCode + '.json'));

        // avoid overwriting existing properties
        if (translationObject[this.moduleNames.toCamelCase()] === undefined)
        {
            translationObject[this.moduleNames.toCamelCase()] = this.moduleNames.toPascalCase();
        }

        // sort object by keys
        const newTranslationObject = ObjectTools.sortByKeys(translationObject);

        fs.writeFileSync(path.join(process.cwd(), cliterConfig.dashboardTranslations, 'navigation', langCode + '.json'), JSON.stringify(newTranslationObject, null, 4));
    }

    // private methods
    private getModelArrayArgument(moduleDecoratorArguments: ObjectLiteralExpression): ArrayLiteralExpression
    {
        const importsArgument: InitializerExpressionGetableNode = moduleDecoratorArguments.getProperty('imports') as InitializerExpressionGetableNode;
        const importsArray: ArrayLiteralExpression = <ArrayLiteralExpression>getInitializer(importsArgument);
        const importsElements = importsArray.getElements();
        const SequelizeModuleElement: CallExpression = importsElements.find(el => el.getText().indexOf('SequelizeModule.forFeature') === 0) as CallExpression;

        if (!SequelizeModuleElement) throw new Error('SequelizeModule.forFeature is not defined in the module, it has to be defined to get it.');

        return SequelizeModuleElement.getArguments()[0] as ArrayLiteralExpression;
    }

    private getModuleDecoratorArguments(sourceFile: SourceFile, className: string, decorator: string): ObjectLiteralExpression
    {
        const moduleClass = sourceFile.getClass(className);
        const moduleDecorator: Decorator = moduleClass?.getDecorator(decorator) as Decorator;
        return moduleDecorator.getArguments()[0] as ObjectLiteralExpression;
    }

    private getImportedDeclarations(sourceFile: SourceFile): string[]
    {
        const imports = sourceFile.getImportDeclarations();
        let modules: string[] = [];
        for (const importObj of imports)
        {
            modules = [...modules, ...importObj.getNamedImports().map(i => i.getName())];
        }

        return modules;
    }
}
