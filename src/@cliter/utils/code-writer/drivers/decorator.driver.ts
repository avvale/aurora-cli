/* eslint-disable max-params */
import { ArrayLiteralExpression, Decorator, ObjectLiteralExpression, SourceFile } from 'ts-morph';
import { ObjectDriver } from './object.driver';
import { ProviderDriver } from './provider.driver';

export class DecoratorDriver
{
    public static getClassDecoratorArguments(
        sourceFile: SourceFile,
        className: string,
        decorator: string,
    ): ObjectLiteralExpression
    {
        const moduleClass = sourceFile.getClass(className);
        const moduleDecorator: Decorator = moduleClass?.getDecorator(decorator) as Decorator;
        return moduleDecorator.getArguments()[0] as ObjectLiteralExpression;
    }

    public static changeDecoratorPropertyAdapter(
        sourceFile: SourceFile,
        moduleName: string,
        decoratorName: string,
        propertyName: string,
        provide: string,
        adapter: string,
    ): void
    {
        const classDecoratorArguments = DecoratorDriver.getClassDecoratorArguments(sourceFile, moduleName, decoratorName);
        const decoratorArrayProperty = ObjectDriver.getInitializerProperty<ArrayLiteralExpression>(classDecoratorArguments, propertyName);

        for (const [index, value] of decoratorArrayProperty.getElements().entries())
        {
            ProviderDriver.changeUseClass(value as ObjectLiteralExpression, provide, adapter);
        }
    }

    public static removeDecoratorAdapter(
        sourceFile: SourceFile,
        moduleName: string,
        decoratorName: string,
        propertyName: string,
        provide: string,
    ): void
    {
        const classDecoratorArguments = DecoratorDriver.getClassDecoratorArguments(sourceFile, moduleName, decoratorName);
        const decoratorArrayProperty = ObjectDriver.getInitializerProperty<ArrayLiteralExpression>(classDecoratorArguments, propertyName);

        for (const [index, value] of decoratorArrayProperty.getElements().entries())
        {
            if (ProviderDriver.isProvideWanted(value as ObjectLiteralExpression, provide))
            {
                decoratorArrayProperty.removeElement(index);
            }
        }
    }
}
