import { ArrayLiteralExpression, ArrowFunction, SourceFile, SyntaxKind } from 'ts-morph';
import { getInitializer } from '../functions';

export class ArrowFunctionDriver
{
    public static getReturnDefaultArrayFromVariable(
        sourceFile: SourceFile,
        variableName: string,
    ): ArrayLiteralExpression
    {
        const provideAurora = sourceFile.getVariableDeclarationOrThrow(variableName);
        const provideAuroraFunction = <ArrowFunction>getInitializer(provideAurora);
        const returnFunction = provideAuroraFunction.getDescendantsOfKind(SyntaxKind.ReturnStatement)[0];
        return returnFunction.getDescendantsOfKind(SyntaxKind.ArrayLiteralExpression)[0];
    }
}
