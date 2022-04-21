import { Project, SourceFile, Decorator, ObjectLiteralExpression, ArrayLiteralExpression, CallExpression, IndentationText, QuoteKind, InitializerExpressionGetableNode } from 'ts-morph';
import { SyntaxKind, NewLineKind } from 'typescript';
import { cliterConfig } from '../../../@cliter/config/cliter.config';
import { Properties } from '../properties';
import { ImportDriver } from './import.driver';
import { ExportDriver } from './export.driver';
import { ArrayDriver } from './array.driver';
import { InterfaceDriver } from './interface.driver';
import * as path from 'node:path';
import * as fs from 'node:fs';
import { ObjectTools } from '../object-tools';

export class CodeWriter
{
    private project: Project;

    constructor(
        public readonly srcDirectory: string,
        public readonly appDirectory: string,
        public readonly frameworkDirectory: string,
        public readonly boundedContextName: string,
        public readonly moduleName: string,
        public readonly moduleNames: string,
        public readonly aggregateName: string,
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

    generateTestingForeignReferences(properties: Properties): void
    {
        // get foreign relationship
        const foreignRelationships = properties.getForeignRelationship(this.boundedContextName);

        // check that exist bounded context folder
        if (!fs.existsSync(path.join(process.cwd(), 'cliter', this.boundedContextName.toKebabCase()))) return;

        // get all yaml files to get all modules managed by cli
        const yamlFiles = fs.readdirSync(path.join(process.cwd(), 'cliter', this.boundedContextName.toKebabCase()));

        for (const foreignRelationship of foreignRelationships)
        {
            if (!foreignRelationship.relationshipModulePath) return;

            const foreignBoundedContextName = foreignRelationship.relationshipModulePath.split('/')[0];

            for (const yamlFile of yamlFiles)
            {
                // get filename of e2e test
                const e2eTestFile = yamlFile.replace('.yaml', '.e2e-spec.ts');

                const e2eTestPath = path.join(process.cwd(), 'test', 'acceptance', this.boundedContextName.toKebabCase(), e2eTestFile);

                // check that exist e2e test file
                if (fs.existsSync(e2eTestPath))
                {
                    // get sourceFile of e2e test
                    const sourceFile = this.project.addSourceFileAtPath(e2eTestPath);

                    // register import in e2e test
                    ImportDriver.createImportItems(
                        sourceFile,
                        foreignRelationship.relationshipPackageName ?
                            foreignRelationship.relationshipPackageName :
                            `./../../../src/${cliterConfig.apiContainer}/${foreignBoundedContextName.toKebabCase()}/${foreignBoundedContextName.toKebabCase()}.module`,
                        [
                            `${foreignBoundedContextName.toPascalCase()}Module`,
                        ],
                    );

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

    generateReferences(properties: Properties): void
    {
        const sourceFile = this.project.addSourceFileAtPath(path.join(process.cwd(), this.srcDirectory, this.appDirectory, this.boundedContextName.toKebabCase(), 'index.ts'));

        // register import in @apps/boundedContext/index.ts
        ImportDriver.createImportItems(
            sourceFile,
            `./${this.moduleName.toKebabCase()}`,
            [
                `${this.boundedContextName.toPascalCase()}${this.moduleName.toPascalCase()}Handlers`,
                `${this.boundedContextName.toPascalCase()}${this.moduleName.toPascalCase()}Services`,
                `${this.boundedContextName.toPascalCase()}${this.moduleName.toPascalCase()}Model`,
                `I${this.moduleName.toPascalCase()}Repository`,
                `Sequelize${this.moduleName.toPascalCase()}Repository`,
                `${this.moduleName.toPascalCase()}Sagas`,
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

        // intermediate table model
        for (const intermediateModel of properties.withRelationshipIntermediateTable)
        {
            ImportDriver.createImportItems(
                sourceFile,
                `./${this.moduleName.toKebabCase()}`,
                [intermediateModel.intermediateModel as string],
            );

            ArrayDriver.addArrayItem(
                sourceFile,
                intermediateModel.intermediateModel as string,
                `${this.boundedContextName.toPascalCase()}Models`,
            );
        }

        // repositories
        ArrayDriver.addArrayItem(
            sourceFile,
            `
{
    provide : I${this.moduleName.toPascalCase()}Repository,
    useClass: Sequelize${this.moduleName.toPascalCase()}Repository
}`,
            `${this.boundedContextName.toPascalCase()}Repositories`,
        );

        // sagas
        ArrayDriver.addArrayItem(
            sourceFile,
            `${this.moduleName.toPascalCase()}Sagas`,
            `${this.boundedContextName.toPascalCase()}Sagas`,
        );

        // add i18n registers
        if (properties.hasI18n)
        {
            // register import
            ImportDriver.createImportItems(
                sourceFile,
                `./${this.moduleName.toKebabCase()}`,
                [
                    `${this.boundedContextName.toPascalCase()}${this.moduleName.toPascalCase()}I18NModel`,
                    `I${this.moduleName.toPascalCase()}I18NRepository`,
                    `Sequelize${this.moduleName.toPascalCase()}I18NRepository`,
                ],
            );

            // models
            ArrayDriver.addArrayItem(
                sourceFile,
                `${this.boundedContextName.toPascalCase()}${this.moduleName.toPascalCase()}I18NModel`,
                `${this.boundedContextName.toPascalCase()}Models`,
            );

            // repositories
            ArrayDriver.addArrayItem(
                sourceFile,
                `
{
    provide : I${this.moduleName.toPascalCase()}I18NRepository,
    useClass: Sequelize${this.moduleName.toPascalCase()}I18NRepository
}`,
                `${this.boundedContextName.toPascalCase()}Repositories`,
            );
        }

        sourceFile?.saveSync();
    }

    generateDashboardInterface(
        properties: Properties,
        {
            overwrite = false,
        }: {
            overwrite?: boolean;
        } = {},
    ): void
    {
        const sourceFile = this.project.addSourceFileAtPath(path.join(process.cwd(), this.srcDirectory, cliterConfig.dashboardContainer, this.boundedContextName.toKebabCase(), `${this.boundedContextName.toKebabCase()}.types.ts`));

        // create type
        InterfaceDriver.addInterface(
            sourceFile,
            `${this.boundedContextName.toPascalCase()}${this.moduleName.toPascalCase()}`,
            properties.withoutTimestamps.map(property => ({ name: property.name.toCamelCase(), type: property.getJavascriptType })),
            { overwrite },
        );

        sourceFile?.saveSync();
    }

    generateFrontRoutes(index = 0): void
    {
        const sourceFile = this.project.addSourceFileAtPath(path.join(process.cwd(), this.srcDirectory, cliterConfig.dashboardContainer, this.boundedContextName.toKebabCase(), `${this.boundedContextName.toKebabCase()}.routing.ts`));

        const routes = sourceFile.getVariableDeclarationOrThrow(this.boundedContextName.toCamelCase() + 'Routes');
        const routesArray = routes.getInitializerIfKindOrThrow(SyntaxKind.ArrayLiteralExpression);

        const objectRoute = routesArray.getElements()[index] as ObjectLiteralExpression;
        const childrenRoutes = objectRoute.getPropertyOrThrow('children') as InitializerExpressionGetableNode;
        const childrenRoutesArray = childrenRoutes?.getInitializerIfKindOrThrow(SyntaxKind.ArrayLiteralExpression);

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
                `${this.moduleName.toPascalCase()}EditResolver`,
                `${this.moduleName.toPascalCase()}NewResolver`,
                `${this.moduleName.toPascalCase()}PaginationResolver`,
            ],
        );

        // add route to list items
        ArrayDriver.addArrayItem(
            sourceFile,
            `{ path: '${this.moduleName.toKebabCase()}', component: ${this.moduleName.toPascalCase()}ListComponent, resolve: { data: ${this.moduleName.toPascalCase()}PaginationResolver }, data: { permission: '${this.boundedContextName.toCamelCase()}.${this.moduleName.toCamelCase()}.get' }}`,
            childrenRoutesArray,
            (item: string, array: ArrayLiteralExpression | undefined) =>
            {
                const foundItem = (array?.getElements() as ObjectLiteralExpression[]).find(item =>
                {
                    return `'${this.moduleName.toKebabCase()}'` === (item.getPropertyOrThrow('path') as InitializerExpressionGetableNode).getInitializerIfKindOrThrow(SyntaxKind.StringLiteral).getText();
                });

                return !!foundItem;
            },
        );

        // add route to new item
        ArrayDriver.addArrayItem(
            sourceFile,
            `{ path: '${this.moduleName.toKebabCase()}/new', component: ${this.moduleName.toPascalCase()}DetailComponent, resolve: { data: ${this.moduleName.toPascalCase()}NewResolver }, data: { permission: '${this.boundedContextName.toCamelCase()}.${this.moduleName.toCamelCase()}.create' }},`,
            childrenRoutesArray,
            (item: string, array: ArrayLiteralExpression | undefined) =>
            {
                const foundItem = (array?.getElements() as ObjectLiteralExpression[]).find(item =>
                {
                    return `'${this.moduleName.toKebabCase()}/new'` === (item.getPropertyOrThrow('path') as InitializerExpressionGetableNode).getInitializerIfKindOrThrow(SyntaxKind.StringLiteral).getText();
                });

                return !!foundItem;
            },
        );

        // add route to edit item
        ArrayDriver.addArrayItem(
            sourceFile,
            `{ path: '${this.moduleName.toKebabCase()}/edit/:id', component: ${this.moduleName.toPascalCase()}DetailComponent, resolve: { data: ${this.moduleName.toPascalCase()}EditResolver }, data: { permission: '${this.boundedContextName.toCamelCase()}.${this.moduleName.toCamelCase()}.get' }},`,
            childrenRoutesArray,
            (item: string, array: ArrayLiteralExpression | undefined) =>
            {
                const foundItem = (array?.getElements() as ObjectLiteralExpression[]).find(item =>
                {
                    return `'${this.moduleName.toKebabCase()}/edit/:id'` === (item.getPropertyOrThrow('path') as InitializerExpressionGetableNode).getInitializerIfKindOrThrow(SyntaxKind.StringLiteral).getText();
                });

                return !!foundItem;
            },
        );

        sourceFile?.saveSync();
    }

    declareDashboardComponents(): void
    {
        const sourceFile = this.project.addSourceFileAtPath(path.join(process.cwd(), this.srcDirectory, cliterConfig.dashboardContainer, this.boundedContextName.toKebabCase(), `${this.boundedContextName.toKebabCase()}.module.ts`));
        const moduleDecoratorArguments = this.getModuleDecoratorArguments(sourceFile, `${this.boundedContextName.toPascalCase()}Module`, 'NgModule');

        // declarations
        const declarations: InitializerExpressionGetableNode = moduleDecoratorArguments.getProperty('declarations') as InitializerExpressionGetableNode;
        const declarationsArray: ArrayLiteralExpression = declarations?.getInitializerIfKindOrThrow(SyntaxKind.ArrayLiteralExpression) as ArrayLiteralExpression;

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

    declareDashboardBoundedContext(index = 5): void
    {
        const sourceFile = this.project.addSourceFileAtPath(path.join(process.cwd(), this.srcDirectory, 'app', 'app.routing.ts'));

        const appRoutes = sourceFile.getVariableDeclarationOrThrow('appRoutes');
        const appRoutesArray = appRoutes.getInitializerIfKindOrThrow(SyntaxKind.ArrayLiteralExpression);
        const objectRoute = appRoutesArray.getElements()[index] as ObjectLiteralExpression;
        const childrenRoutes = objectRoute.getPropertyOrThrow('children') as InitializerExpressionGetableNode;
        const childrenRoutesArray = childrenRoutes?.getInitializerIfKindOrThrow(SyntaxKind.ArrayLiteralExpression);
        const childrenRoutesElements = childrenRoutesArray.getElements() as ObjectLiteralExpression[];

        // avoid duplicated declaration
        for (const element of childrenRoutesElements)
        {
            const pathProperty = element.getPropertyOrThrow('path') as InitializerExpressionGetableNode;
            const pathString = pathProperty.getInitializerIfKindOrThrow(SyntaxKind.StringLiteral);

            if (pathString.getText() === `'${this.boundedContextName.toKebabCase()}'`) return;
        }

        // set routes
        childrenRoutesArray?.addElement(
            `{ path: '${this.boundedContextName.toKebabCase()}', loadChildren: () => import('app/modules/admin/apps/${this.boundedContextName.toKebabCase()}/${this.boundedContextName.toKebabCase()}.module').then(m => m.${this.boundedContextName.toPascalCase()}Module) },`
            , { useNewLines: true });

        sourceFile?.saveSync();
    }

    generateDashboardMenu(): void
    {
        const sourceFile = this.project.addSourceFileAtPath(path.join(process.cwd(), this.srcDirectory, cliterConfig.dashboardContainer, this.boundedContextName.toKebabCase(), `${this.boundedContextName.toKebabCase()}.menu.ts`));
        const menu = sourceFile.getVariableDeclarationOrThrow(this.boundedContextName.toCamelCase() + 'Menu');
        const objectMenu = menu.getInitializerIfKindOrThrow(SyntaxKind.ObjectLiteralExpression);
        const childrenProperty = objectMenu.getPropertyOrThrow('children') as InitializerExpressionGetableNode;
        const childrenArrayMenu = childrenProperty.getInitializerIfKindOrThrow(SyntaxKind.ArrayLiteralExpression);
        const menuElements = childrenArrayMenu.getElements() as ObjectLiteralExpression[];

        // avoid duplicated declaration
        for (const element of menuElements)
        {
            const pathProperty = element.getPropertyOrThrow('id') as InitializerExpressionGetableNode;
            const pathString = pathProperty.getInitializerIfKindOrThrow(SyntaxKind.StringLiteral);

            if (pathString.getText() === `'${this.moduleName.toCamelCase()}'`) return;
        }

        // set routes
        ArrayDriver.addArrayItem(
            sourceFile,
            `{
    id   : '${this.moduleNames.toCamelCase()}',
    title: '${this.moduleName.toPascalCase()}',
    type : 'basic',
    icon : 'heroicons_outline:tag',
    link : '/${this.boundedContextName.toKebabCase()}/${this.moduleName.toKebabCase()}',
},`,
            childrenArrayMenu,
            (item: string, array: ArrayLiteralExpression | undefined) =>
            {
                const foundItem = (array?.getElements() as ObjectLiteralExpression[]).find(item =>
                {
                    return `'${this.moduleNames.toCamelCase()}'` === (item.getPropertyOrThrow('id') as InitializerExpressionGetableNode).getInitializerIfKindOrThrow(SyntaxKind.StringLiteral).getText();
                });

                return !!foundItem;
            },
        );

        sourceFile?.saveSync();
    }

    generateDashboardTranslations(properties: Properties, langCode: string): void
    {
        const translationObject = require(path.join(process.cwd(), this.srcDirectory, cliterConfig.dashboardTranslations, this.boundedContextName.toKebabCase(), langCode + '.json'));

        // get names to translate
        const names = properties.withoutTimestamps.filter(property => property.name !== 'id').map(property => property.name);

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

        fs.writeFileSync(path.join(process.cwd(), this.srcDirectory, cliterConfig.dashboardTranslations, this.boundedContextName.toKebabCase(), langCode + '.json'), JSON.stringify(newTranslationObject, null, 4));
    }

    generateDashboardMenuTranslation(langCode: string): void
    {
        const translationObject = require(path.join(process.cwd(), this.srcDirectory, cliterConfig.dashboardTranslations, 'navigation', langCode + '.json'));

        // avoid overwriting existing properties
        if (translationObject[this.moduleNames.toCamelCase()] === undefined)
        {
            translationObject[this.moduleNames.toCamelCase()] = this.moduleNames.toPascalCase();
        }

        // sort object by keys
        const newTranslationObject = ObjectTools.sortByKeys(translationObject);

        fs.writeFileSync(path.join(process.cwd(), this.srcDirectory, cliterConfig.dashboardTranslations, 'navigation', langCode + '.json'), JSON.stringify(newTranslationObject, null, 4));
    }

    /****************************************************************
     * Add import and declare application items in bounded context
     * module.
     *
     * @return void
     ****************************************************************/
    declareApplicationItemsInModule(): void
    {
        // get decorator arguments
        const sourceFile = this.project.addSourceFileAtPath(path.join(process.cwd(), this.srcDirectory, this.frameworkDirectory, this.boundedContextName.toKebabCase(), `${this.boundedContextName.toKebabCase()}.module.ts`));
        const moduleDecoratorArguments = this.getModuleDecoratorArguments(sourceFile, `${this.boundedContextName.toPascalCase()}Module`, 'Module');

        // providers
        const providers: InitializerExpressionGetableNode = moduleDecoratorArguments.getProperty('providers') as InitializerExpressionGetableNode;
        const providersArray: ArrayLiteralExpression = providers?.getInitializerIfKindOrThrow(SyntaxKind.ArrayLiteralExpression) as ArrayLiteralExpression;

        // controllers
        const controllers: InitializerExpressionGetableNode = moduleDecoratorArguments.getProperty('controllers') as InitializerExpressionGetableNode;
        const controllersArray = controllers?.getInitializerIfKindOrThrow(SyntaxKind.ArrayLiteralExpression);

        // register imports from bounded context
        ImportDriver.createImportItems(
            sourceFile,
            `../../${cliterConfig.applicationsContainer}/${this.boundedContextName.toKebabCase()}`,
            [
                `${this.boundedContextName.toPascalCase()}Models`,
                `${this.boundedContextName.toPascalCase()}Handlers`,
                `${this.boundedContextName.toPascalCase()}Services`,
                `${this.boundedContextName.toPascalCase()}Repositories`,
                `${this.boundedContextName.toPascalCase()}Sagas`,
            ],
        );

        // register import for controllers and providers
        ImportDriver.createImportItems(
            sourceFile,
            `./${this.moduleName.toKebabCase()}`,
            [
                `${this.boundedContextName.toPascalCase()}${this.moduleName.toPascalCase()}Controllers`,
                `${this.boundedContextName.toPascalCase()}${this.moduleName.toPascalCase()}Resolvers`,
                `${this.boundedContextName.toPascalCase()}${this.moduleName.toPascalCase()}ApiHandlers`,
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
                `...${this.boundedContextName.toPascalCase()}Handlers`,
                `...${this.boundedContextName.toPascalCase()}Services`,
                `...${this.boundedContextName.toPascalCase()}Repositories`,
                `...${this.boundedContextName.toPascalCase()}Sagas`,
                `...${this.boundedContextName.toPascalCase()}${this.moduleName.toPascalCase()}Resolvers`,
                `...${this.boundedContextName.toPascalCase()}${this.moduleName.toPascalCase()}ApiHandlers`,
            ],
            providersArray,
        );

        // add controller to controllers array
        ArrayDriver.addArrayItem(
            sourceFile,
            `...${this.boundedContextName.toPascalCase()}${this.moduleName.toPascalCase()}Controllers`,
            controllersArray,
        );

        sourceFile?.saveSync();
    }

    declareBoundedContextModuleInApplicationModule(): void
    {
        const sourceFile = this.project.addSourceFileAtPath(path.join(process.cwd(), this.srcDirectory, 'app.module.ts'));
        const moduleDecoratorArguments = this.getModuleDecoratorArguments(sourceFile, 'AppModule', 'Module');
        const modules: string[] = this.getImportedModules(sourceFile);

        if (!modules.includes(`${this.boundedContextName.toPascalCase()}Module`))
        {
            // import module
            ImportDriver.createImportItems(
                sourceFile,
                `./${cliterConfig.apiContainer}/${this.boundedContextName.toKebabCase()}/${this.boundedContextName.toKebabCase()}.module`,
                [`${this.boundedContextName.toPascalCase()}Module`],
            );

            // register module
            const importsArgument: InitializerExpressionGetableNode = moduleDecoratorArguments.getProperty('imports') as InitializerExpressionGetableNode;
            const importsArray = importsArgument?.getInitializerIfKindOrThrow(SyntaxKind.ArrayLiteralExpression);
            importsArray.addElement(`${this.boundedContextName.toPascalCase()}Module`, { useNewLines: true });
        }

        sourceFile?.saveSync();
    }

    /****************************************************************
     * Add exports of principal application elements to src/index.ts
     * this is to have access to all elements from index.ts
     *
     * @return void
     ****************************************************************/
    declareApplicationItemsExports(): void
    {
        const sourceFile = this.project.addSourceFileAtPath(path.join(process.cwd(), this.srcDirectory, 'index.ts'));

        // export module
        ExportDriver.createExportItems(
            sourceFile,
            `./${cliterConfig.apiContainer}/${this.boundedContextName.toKebabCase()}/${this.boundedContextName.toKebabCase()}.module`,
            [`${this.boundedContextName.toPascalCase()}Module`],
        );

        // export DTO
        ExportDriver.createExportItems(
            sourceFile,
            `./${cliterConfig.apiContainer}/${this.boundedContextName.toKebabCase()}/${this.moduleName.toKebabCase()}/dto/${this.boundedContextName.toKebabCase()}-${this.moduleName.toKebabCase()}.dto`,
            [`${this.boundedContextName.toPascalCase()}${this.moduleName.toPascalCase()}Dto`],
        );

        // export aggregate
        ExportDriver.createExportItems(
            sourceFile,
            `./${cliterConfig.applicationsContainer}/${this.boundedContextName.toKebabCase()}/${this.moduleName.toKebabCase()}/domain/${this.moduleName.toKebabCase()}.aggregate`,
            [`${this.aggregateName}`],
        );

        // export model
        ExportDriver.createExportItems(
            sourceFile,
            `./${cliterConfig.applicationsContainer}/${this.boundedContextName.toKebabCase()}/${this.moduleName.toKebabCase()}`,
            [`${this.boundedContextName.toPascalCase()}${this.moduleName.toPascalCase()}Model`],
        );

        // export response
        ExportDriver.createExportItems(
            sourceFile,
            `./${cliterConfig.applicationsContainer}/${this.boundedContextName.toKebabCase()}/${this.moduleName.toKebabCase()}/domain/${this.moduleName.toKebabCase()}.response`,
            [`${this.moduleName.toPascalCase()}Response`],
        );

        // export mapper
        ExportDriver.createExportItems(
            sourceFile,
            `./${cliterConfig.applicationsContainer}/${this.boundedContextName.toKebabCase()}/${this.moduleName.toKebabCase()}/domain/${this.moduleName.toKebabCase()}.mapper`,
            [`${this.moduleName.toPascalCase()}Mapper`],
        );

        // export seed
        ExportDriver.createExportItems(
            sourceFile,
            `./${cliterConfig.applicationsContainer}/${this.boundedContextName.toKebabCase()}/${this.moduleName.toKebabCase()}/infrastructure/seeds/${this.moduleName.toKebabCase()}.seed`,
            [`${this.moduleNames.toCamelCase()}`],
        );

        sourceFile?.saveSync();
    }

    declareAuthModuleInShareModule(): void
    {
        const sourceFile = this.project.addSourceFileAtPath(path.join(process.cwd(), this.srcDirectory, path.join(cliterConfig.auroraLocalPackage, 'shared.module.ts')));
        const moduleDecoratorArguments = this.getModuleDecoratorArguments(sourceFile, 'SharedModule', 'Module');

        // register import auth module
        ImportDriver.createImportItems(
            sourceFile,
            cliterConfig.applicationsContainer + '/iam/shared/domain/modules/auth/auth.module.ts',
            [
                'AuthModule',
            ],
        );

        // register auth module
        const importsArgument: InitializerExpressionGetableNode = <InitializerExpressionGetableNode>moduleDecoratorArguments.getProperty('imports');
        const importsArray = importsArgument?.getInitializerIfKindOrThrow(SyntaxKind.ArrayLiteralExpression);
        const importsElements = importsArray.getElements();

        // check if AuthModule is imported
        if (!importsElements.find(el => el.getText() === 'AuthModule')) importsArray.addElement('AuthModule', { useNewLines: true });

        // register auth module
        const exportsArgument: InitializerExpressionGetableNode = <InitializerExpressionGetableNode>moduleDecoratorArguments.getProperty('exports');
        const exportsArray = exportsArgument?.getInitializerIfKindOrThrow(SyntaxKind.ArrayLiteralExpression);
        const exportsElements = exportsArray.getElements();

        // check if AuthModule is imported
        if (!exportsElements.find(el => el.getText() === 'AuthModule')) exportsArray.addElement('AuthModule', { useNewLines: true });

        sourceFile?.saveSync();
    }

    private getModelArrayArgument(moduleDecoratorArguments: ObjectLiteralExpression): ArrayLiteralExpression
    {
        const importsArgument: InitializerExpressionGetableNode = moduleDecoratorArguments.getProperty('imports') as InitializerExpressionGetableNode;
        const importsArray: ArrayLiteralExpression = importsArgument.getInitializerIfKindOrThrow(SyntaxKind.ArrayLiteralExpression);
        const importsElements = importsArray.getElements();
        const SequelizeModuleElement: CallExpression = importsElements.find(el => el.getText().indexOf('SequelizeModule.forFeature') === 0) as CallExpression;
        return SequelizeModuleElement.getArguments()[0] as ArrayLiteralExpression;
    }

    private getImportedModules(sourceFile: SourceFile): string[]
    {
        const imports = sourceFile.getImportDeclarations();
        let modules: string[] = [];
        for (const importObj of imports)
        {
            modules = modules.concat(importObj.getNamedImports().map(i => i.getName()));
        }

        return modules;
    }

    private getModuleDecoratorArguments(sourceFile: SourceFile, className: string, decorator: string): ObjectLiteralExpression
    {
        const moduleClass = sourceFile.getClass(className);
        const moduleDecorator: Decorator = moduleClass?.getDecorator(decorator) as Decorator;
        return moduleDecorator.getArguments()[0] as ObjectLiteralExpression;
    }
}
