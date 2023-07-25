import { ArrayLiteralExpression, SourceFile, SyntaxKind } from 'ts-morph';

export class ArrowFunctionDriver
{
    public static getReturnDefaultArrayFromVariable(
        sourceFile: SourceFile,
        variableName: string,
    ): ArrayLiteralExpression
    {
        const provideAurora = sourceFile.getVariableDeclarationOrThrow(variableName);
        const provideAuroraFunction = provideAurora.getInitializerIfKindOrThrow(SyntaxKind.ArrowFunction);
        const returnFunction = provideAuroraFunction.getDescendantsOfKind(SyntaxKind.ReturnStatement)[0];
        return returnFunction.getDescendantsOfKind(SyntaxKind.ArrayLiteralExpression)[0];
    }
}
