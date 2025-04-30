/* eslint-disable max-params */
import { SourceFile, ObjectLiteralExpression, InitializerExpressionGetableNode, ArrayLiteralExpression, StringLiteral } from 'ts-morph';
import { cliterConfig } from '../../config/cliter.config';
import { ArrayDriver, DecoratorDriver, ImportDriver, ObjectDriver, VariableDriver } from './drivers';
import { getInitializer } from './functions';

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
        // TODO, replace addElement with ArrayDriver.addArrayItems
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
        const appRoutesArray = VariableDriver.getInitializerVariable<ArrayLiteralExpression>(sourceFile, 'appRoutes');
        const objectRoute = appRoutesArray.getElements()[index] as ObjectLiteralExpression;
        const childrenRoutesArray = ObjectDriver.getInitializerProperty<ArrayLiteralExpression>(objectRoute, 'children');
        const childrenRoutesElements = childrenRoutesArray.getElements() as ObjectLiteralExpression[];

        // avoid duplicated declaration
        for (const element of childrenRoutesElements)
        {
            const pathProperty = element.getPropertyOrThrow('path') as InitializerExpressionGetableNode;
            const pathString = <StringLiteral>getInitializer(pathProperty);

            if (pathString.getText() === `'${boundedContextName.toKebabCase()}'`) return;
        }

        // set routes
        // TODO, replace addElement with ArrayDriver.addArrayItems
        childrenRoutesArray?.addElement(
            `{ path: '${boundedContextName.toKebabCase()}', loadChildren: () => import('app/modules/admin/apps/${boundedContextName.toKebabCase()}/${boundedContextName.toKebabCase()}.routes') },`
            , { useNewLines: true });
    },

    changeModuleDecoratorPropertyAdapter(
        sourceFile: SourceFile,
        moduleName: string,
        decoratorName: string,
        propertyName: string,
        provide: string,
        adapter: string,
        adapterPath: string,
    ): void
    {
        if (ImportDriver.hasImportDeclarations(sourceFile, adapter)) return;

        ImportDriver.createImportItems(
            sourceFile,
            adapterPath,
            [adapter],
        );

        DecoratorDriver.changeModuleDecoratorPropertyAdapter(
            sourceFile,
            moduleName,
            decoratorName,
            propertyName,
            provide,
            adapter,
        );
    },
};
