import { EnumDeclaration, SourceFile } from 'ts-morph';

export class EnumDriver
{
    public static addEnum(
        sourceFile: SourceFile,
        enumName: string,
        members: string[],
        {
            overwrite = false,
        }: {
            overwrite?: boolean;
        } = {},
    ): EnumDeclaration | undefined
    {
        // avoid duplicate enums in same file
        const enumInstance = sourceFile.getEnum(enumName);
        if (enumInstance)
        {
            if (overwrite)
            {
                enumInstance.remove();
            }
            else
            {
                return;
            }
        }

        const enumDeclaration = sourceFile.addEnum({
            name: enumName,
            members: members.map(member => ({
                name : member,
                value: member,
            })),
        });

        enumDeclaration.setIsExported(true);

        return enumDeclaration;
    }
}
