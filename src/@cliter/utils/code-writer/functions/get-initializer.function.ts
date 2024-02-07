import { InitializerExpressionGetableNode, VariableDeclaration } from 'ts-morph';

export const getInitializer = <T>(
    expression: InitializerExpressionGetableNode | VariableDeclaration | undefined,
): any =>
{
    return expression?.getInitializer() as T;
};
