import { Decorator, ObjectLiteralExpression, SourceFile } from 'ts-morph';

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
}
