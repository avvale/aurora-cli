import { CallExpression, SourceFile, SyntaxKind } from 'ts-morph';

export class CallExpressionDriver
{
    public static findCallExpression(
        sourceFile: SourceFile,
        functionName: string,
    ): CallExpression | undefined
    {
        const callExpressions = sourceFile.getDescendantsOfKind(SyntaxKind.CallExpression);

        for (const callExpression of callExpressions)
        {
            if (callExpression.getExpression().getText() === functionName)
            {
                return callExpression;
            }
        }
    }

    public static get(
        sourceFile: SourceFile,
        functionName: string,
    ): CallExpression[]
    {
        const callExpressions = sourceFile.getDescendantsOfKind(SyntaxKind.CallExpression);
        const callExpressionsTarget = [];

        for (const callExpression of callExpressions)
        {
            if (callExpression.getExpression().getText() === functionName)
            {
                callExpressionsTarget.push(callExpression);
            }
        }

        return callExpressionsTarget;
    }

    public static replaceArgument(
        callExpression: CallExpression,
        oldArgumentName: string,
        newArgumentName: string,
    ): void
    {
        for (const [index, value] of callExpression.getArguments().entries())
        {
            if (value.getText() === oldArgumentName)
            {
                callExpression.insertArgument(index, newArgumentName);
                CallExpressionDriver.removeArgument(callExpression, oldArgumentName);
                break;
            }
        }
    }

    public static removeArgument(
        callExpression: CallExpression,
        argumentName: string,
    ): void
    {
        for (const [index, value] of callExpression.getArguments().entries())
        {
            if (value.getText() === argumentName)
            {
                callExpression.removeArgument(index);
                break;
            }
        }
    }
}
