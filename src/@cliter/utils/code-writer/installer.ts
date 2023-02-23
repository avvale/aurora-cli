import { SourceFile, ObjectLiteralExpression, InitializerExpressionGetableNode, ArrayLiteralExpression } from 'ts-morph';
import { SyntaxKind } from 'typescript';
import { cliterConfig } from '../../config/cliter.config';
import { ImportDriver } from './drivers/import.driver';
import { ArrayDriver } from './drivers/array.driver';
import { DecoratorDriver } from './drivers/decorator.driver';
import { ObjectDriver } from './drivers/object.driver';
import { ProviderDriver } from './drivers/provider.driver';

export const Installer =
{
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

        const classDecoratorArguments = DecoratorDriver.getClassDecoratorArguments(sourceFile, moduleName, decoratorName);
        const decoratorArrayProperty = ObjectDriver.getInitializerProperty<ArrayLiteralExpression>(classDecoratorArguments, propertyName);

        for (const [index, value] of decoratorArrayProperty.getElements().entries())
        {
            ProviderDriver.changeUseClass(value as ObjectLiteralExpression, provide, adapter);
        }
    },
};
