import { InterfaceDeclaration, SourceFile } from 'ts-morph';

export class InterfaceDriver
{
    public static getInterface(sourceFile: SourceFile, interfaceName: string): InterfaceDeclaration | undefined
    {
        return sourceFile.getInterface(interfaceName);
    }

    public static addInterface(sourceFile: SourceFile, interfaceName: string, properties: { name: string; type: string}[]): InterfaceDeclaration
    {
        const interfaceDeclaration = sourceFile.addInterface({
            name: interfaceName,
        });

        interfaceDeclaration.addProperties(properties);

        // export interface declaration
        interfaceDeclaration.setIsExported(true);

        return interfaceDeclaration;
    }

    public static addProperty(interfaceDeclaration: InterfaceDeclaration, property: { name: string; type: string}): InterfaceDeclaration
    {
        interfaceDeclaration.addProperty(property);

        return interfaceDeclaration;
    }
}