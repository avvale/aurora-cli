import { Project, SourceFile, Decorator, ObjectLiteralExpression, ArrayLiteralExpression, CallExpression, IndentationText, QuoteKind, InitializerExpressionGetableNode } from 'ts-morph';
import { SyntaxKind, NewLineKind } from 'typescript';
import { cliterConfig } from './../../../@cliter/config/cliter.config';
import { Properties } from './../properties';
import { ImportDriver } from './import.driver';
import { ExportDriver } from './export.driver';
import { ArrayDriver } from './array.driver';
import * as path from 'path';
import * as fs from 'fs';

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
                const e2eTestFile = yamlFile.replace('.yml', '').concat('.e2e-spec.ts');

                const e2eTestPath = path.join(process.cwd(), 'test', 'acceptance', this.boundedContextName.toKebabCase(), e2eTestFile);

                // check that exist e2e test file
                if (fs.existsSync(e2eTestPath))
                {
                    // get sourceFile of e2e test
                    const sourceFile = this.project.addSourceFileAtPath(e2eTestPath);

                    // register import in e2e test
                    ImportDriver.createImportItems(
                        sourceFile,
                        `./../../../src/${cliterConfig.apiContainer}/${foreignBoundedContextName.toKebabCase()}/${foreignBoundedContextName.toKebabCase()}.module`,
                        [
                            `${foreignBoundedContextName.toPascalCase()}Module`,
                        ],
                    );

                    // register import in import array
                    ArrayDriver.createArrayItem(
                        sourceFile,
                        `${foreignBoundedContextName.toPascalCase()}Module`,
                        'importForeignModules',
                    );

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
        ArrayDriver.createArrayItem(
            sourceFile,
            `...${this.boundedContextName.toPascalCase()}${this.moduleName.toPascalCase()}Handlers`,
            `${this.boundedContextName.toPascalCase()}Handlers`,
        );

        // services
        ArrayDriver.createArrayItem(
            sourceFile,
            `...${this.boundedContextName.toPascalCase()}${this.moduleName.toPascalCase()}Services`,
            `${this.boundedContextName.toPascalCase()}Services`,
        );

        // models
        ArrayDriver.createArrayItem(
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

            ArrayDriver.createArrayItem(
                sourceFile,
                intermediateModel.intermediateModel as string,
                `${this.boundedContextName.toPascalCase()}Models`,
            );
        }

        // repositories
        ArrayDriver.createArrayItem(
            sourceFile,
            `
{
    provide : I${this.moduleName.toPascalCase()}Repository,
    useClass: Sequelize${this.moduleName.toPascalCase()}Repository
}`,
            `${this.boundedContextName.toPascalCase()}Repositories`,
        );

        // sagas
        ArrayDriver.createArrayItem(
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
            ArrayDriver.createArrayItem(
                sourceFile,
                `${this.boundedContextName.toPascalCase()}${this.moduleName.toPascalCase()}I18NModel`,
                `${this.boundedContextName.toPascalCase()}Models`,
            );

            // repositories
            ArrayDriver.createArrayItem(
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

    declareFramework(): void
    {
        // get decorator arguments
        const sourceFile = this.project.addSourceFileAtPath(path.join(process.cwd(), this.srcDirectory, this.frameworkDirectory, this.boundedContextName.toKebabCase(), `${this.boundedContextName.toKebabCase()}.module.ts`));
        const moduleDecoratorArguments = this.getModuleDecoratorArguments(sourceFile, `${this.boundedContextName.toPascalCase()}Module`);
        const providers: InitializerExpressionGetableNode = <InitializerExpressionGetableNode>moduleDecoratorArguments.getProperty('providers');

        const providersArray: ArrayLiteralExpression = providers?.getInitializerIfKindOrThrow(SyntaxKind.ArrayLiteralExpression) as ArrayLiteralExpression;

        const controllers: InitializerExpressionGetableNode = <InitializerExpressionGetableNode>moduleDecoratorArguments.getProperty('controllers');
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
            ],
        );

        // add model to ORM array argument
        const modelArrayArgument = this.getModelArrayArgument(moduleDecoratorArguments);
        ArrayDriver.createArrayItem(
            sourceFile,
            `...${this.boundedContextName.toPascalCase()}Models`,
            modelArrayArgument,
        );

        // add handlers to providers
        ArrayDriver.createArrayItems(
            sourceFile,
            [
                `...${this.boundedContextName.toPascalCase()}Handlers`,
                `...${this.boundedContextName.toPascalCase()}Services`,
                `...${this.boundedContextName.toPascalCase()}Repositories`,
                `...${this.boundedContextName.toPascalCase()}Sagas`,
                `...${this.boundedContextName.toPascalCase()}${this.moduleName.toPascalCase()}Resolvers`,
            ],
            providersArray,
        );

        // add controller to controllers array
        ArrayDriver.createArrayItem(
            sourceFile,
            `...${this.boundedContextName.toPascalCase()}${this.moduleName.toPascalCase()}Controllers`, controllersArray,
        );

        sourceFile?.saveSync();
    }

    declareModule(): void
    {
        const sourceFile = this.project.addSourceFileAtPath(path.join(process.cwd(), this.srcDirectory, 'app.module.ts'));
        const moduleDecoratorArguments = this.getModuleDecoratorArguments(sourceFile, 'AppModule');
        const modules: string[] = this.getImportedModules(sourceFile);

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
            const importsArray = importsArgument?.getInitializerIfKindOrThrow(SyntaxKind.ArrayLiteralExpression);
            importsArray.addElement(`${this.boundedContextName.toPascalCase()}Module`, { useNewLines: true });
        }

        sourceFile?.saveSync();
    }

    exportModule(): void
    {
        const sourceFile = this.project.addSourceFileAtPath(path.join(process.cwd(), this.srcDirectory, 'index.ts'));

        // import module
        ExportDriver.createExportItems(
            sourceFile,
            `./${cliterConfig.apiContainer}/${this.boundedContextName.toKebabCase()}/${this.boundedContextName.toKebabCase()}.module`,
        );

        sourceFile?.saveSync();
    }

    declareAuthModuleInShareModule(): void
    {
        const sourceFile = this.project.addSourceFileAtPath(path.join(process.cwd(), this.srcDirectory, path.join(cliterConfig.auroraLocalPackage, 'shared.module.ts')));
        const moduleDecoratorArguments = this.getModuleDecoratorArguments(sourceFile, 'SharedModule');

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

    private getModuleDecoratorArguments(sourceFile: SourceFile, className: string): ObjectLiteralExpression
    {
        const moduleClass = sourceFile.getClass(className);
        const moduleDecorator: Decorator = moduleClass?.getDecorator('Module') as Decorator;
        return moduleDecorator.getArguments()[0] as ObjectLiteralExpression;
    }
}
