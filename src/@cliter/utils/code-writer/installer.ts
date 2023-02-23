import { Project, SourceFile, Decorator, ObjectLiteralExpression, IndentationText, QuoteKind, InitializerExpressionGetableNode, PropertyAssignment, ArrayLiteralExpression } from 'ts-morph';
import { SyntaxKind, NewLineKind } from 'typescript';
import { cliterConfig } from '../../config/cliter.config';
import { ImportDriver } from './import.driver';
import { ArrayDriver } from './array.driver';
import * as path from 'node:path';
import { DecoratorDriver } from './decorator.driver';
import { ObjectDriver } from './object.driver';

export const Installer =
{
    createProject(tsconfigPath: string[]): Project
    {
        return new Project({
            tsConfigFilePath    : path.join(process.cwd(), ...tsconfigPath),
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
    },

    createSourceFile(project: Project, filePath: string[]): SourceFile
    {
        return project?.addSourceFileAtPath(path.join(process.cwd(), ...filePath));
    },

    declareBackPackageModule(sourceFile: SourceFile, boundedContextName: string, items: string[]): void
    {
        if (ImportDriver.hasImportDeclarations(sourceFile, `${boundedContextName.toPascalCase()}Module`)) return;

        ImportDriver.createImportItems(
            sourceFile,
            `${cliterConfig.apiContainer}/${boundedContextName.toKebabCase()}/${boundedContextName.toKebabCase()}.module`,
            items,
        );

        const classDecoratorArguments = DecoratorDriver.getClassDecoratorArguments(sourceFile, 'AppModule', 'Module');
        const importsArray = ObjectDriver.getInitializerProperty<ArrayLiteralExpression>(classDecoratorArguments, 'imports');
        importsArray.addElement(`${boundedContextName.toPascalCase()}Module`, { useNewLines: true });
    },

    declareFrontNavigationMenu(
        sourceFile: SourceFile,
        boundedContextName: string,
        navigationItem: string,
    ): void
    {
        ImportDriver.createImportItems(
            sourceFile,
            `./apps/${boundedContextName.toKebabCase()}/${boundedContextName.toKebabCase()}.navigation`,
            [`${boundedContextName.toCamelCase()}Navigation`],
        );

        ArrayDriver.addArrayItem(
            sourceFile,
            navigationItem,
            'adminNavigation',
        );
    },

    declareFrontRouting(sourceFile: SourceFile, boundedContextName: string, index = 5): void
    {
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

            if (pathString.getText() === `'${boundedContextName.toKebabCase()}'`) return;
        }

        // set routes
        childrenRoutesArray?.addElement(
            `{ path: '${boundedContextName.toKebabCase()}', loadChildren: () => import('app/modules/admin/apps/${boundedContextName.toKebabCase()}/${boundedContextName.toKebabCase()}.module').then(m => m.${boundedContextName.toPascalCase()}Module) },`
            , { useNewLines: true });
    },

    changeDecoratorPropertyAdapter(
        sourceFile: SourceFile,
        moduleName: string,
        propertyName: string,
        provide: string,
        adapter: string,
        adapterPath: string,
        decoratorName: string,
    ): void
    {
        if (ImportDriver.hasImportDeclarations(sourceFile, adapter)) return;

        ImportDriver.createImportItems(
            sourceFile,
            adapterPath,
            [adapter],
        );

        const moduleClass = sourceFile.getClass(moduleName);
        const moduleDecorator = moduleClass?.getDecorator(decoratorName);
        const moduleDecoratorArguments = moduleDecorator?.getArguments()[0] as ObjectLiteralExpression;
        const decoratorProperty = moduleDecoratorArguments.getProperty(propertyName) as InitializerExpressionGetableNode;
        const decoratorArrayProperty = decoratorProperty.getInitializerIfKindOrThrow(SyntaxKind.ArrayLiteralExpression);

        for (const [index, value] of decoratorArrayProperty.getElements().entries())
        {
            // const object = value.getInitializer();
            if (value instanceof ObjectLiteralExpression)
            {
                const properties = value.getProperties();
                let isProvideWanted = false;
                for (const property of properties)
                {
                    if (!(property instanceof PropertyAssignment)) continue;

                    if (
                        property.getName() === 'provide' &&
                        property.getInitializer()?.getText() === provide
                    )
                    {
                        isProvideWanted = true;
                    }

                    if (
                        isProvideWanted &&
                        property.getName() === 'useClass'
                    )
                    {
                        property.setInitializer(adapter);
                        break;
                    }
                }
            }
        }
    },
};
