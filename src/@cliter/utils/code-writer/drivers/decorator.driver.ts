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

    public static addModuleDecoratorProperty(
        sourceFile: SourceFile,
        moduleName: string,
        decoratorName: string,
        propertyName: string,
        module: string,
    ): void
    {
        if (DecoratorDriver.hasModuleDecoratorProperty(sourceFile, moduleName, decoratorName, propertyName, module)) return;

        const classDecoratorArguments = DecoratorDriver.getClassDecoratorArguments(sourceFile, moduleName, decoratorName);
        const decoratorArrayProperty = ObjectDriver.getInitializerProperty<ArrayLiteralExpression>(classDecoratorArguments, propertyName);
        // TODO, replace addElement with ArrayDriver.addArrayItems
        decoratorArrayProperty.addElement(module, { useNewLines: true });
    }

    public static hasModuleDecoratorProperty(
        sourceFile: SourceFile,
        moduleName: string,
        decoratorName: string,
        propertyName: string,
        module: string,
    ): boolean
    {
        const classDecoratorArguments = DecoratorDriver.getClassDecoratorArguments(sourceFile, moduleName, decoratorName);
        const decoratorArrayProperty = ObjectDriver.getInitializerProperty<ArrayLiteralExpression>(classDecoratorArguments, propertyName);
        for (const [index, value] of decoratorArrayProperty.getElements().entries())
        {
            if (value.getText() === module) return true;
        }

        return false;
    }

    public static changeModuleDecoratorPropertyAdapter(
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

    public static addDecoratorAdapter(
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

        decoratorArrayProperty?.addElement(
            `
{
    provide : ${provide},
    useClass: ${adapter}
}`,
            { useNewLines: true },
        );
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
