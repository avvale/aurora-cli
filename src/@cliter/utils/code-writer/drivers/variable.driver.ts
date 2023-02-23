import { SourceFile, VariableDeclaration } from 'ts-morph';

export class VariableDriver
{
    public static getVariable(
        sourceFile: SourceFile,
        variableName: string,
    ): VariableDeclaration | undefined
    {
        return sourceFile.getVariableDeclaration(variableName);
    }

    public static getInitializerVariable<T>(
        sourceFile: SourceFile,
        variableName: string,
    ): T
    {
        return VariableDriver.getVariable(sourceFile, variableName)?.getInitializer() as T;
    }
}
