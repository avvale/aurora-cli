import { SourceFile, SyntaxKind, ArrayLiteralExpression } from 'ts-morph';

export class ArrayDriver
{
    /**
     * Create items in array
     *
     * @param sourceFile
     * @param item          item to add to array
     * @param array         name array or Array literal where will be added the item
     */
    public static createArrayItems(sourceFile: SourceFile, items: string[], array: string | ArrayLiteralExpression): void
    {
        let arrayLiteralExpression;

        if (typeof array === 'string')
        {
            const routesDeclaration = sourceFile?.getVariableDeclaration(array);
            arrayLiteralExpression  = routesDeclaration?.getInitializerIfKindOrThrow(SyntaxKind.ArrayLiteralExpression);

            // if array not exist return void
            if (!arrayLiteralExpression) return;
        }
        else
        {
            arrayLiteralExpression  = array;
        }

        const itemsToImport = ArrayDriver.getUniqueArrayItems(arrayLiteralExpression, items);

        if (itemsToImport.length > 0) arrayLiteralExpression?.addElements(itemsToImport, { useNewLines: true });
    }

    /**
     * Create item in array
     *
     * @param sourceFile
     * @param item          item to add to array
     * @param array         name array or Array literal where will be added the item
     */
    public static createArrayItem(sourceFile: SourceFile, item: string, array: string | ArrayLiteralExpression): void
    {
        let arrayLiteralExpression;

        if (typeof array === 'string')
        {
            const routesDeclaration = sourceFile?.getVariableDeclaration(array);
            arrayLiteralExpression  = routesDeclaration?.getInitializerIfKindOrThrow(SyntaxKind.ArrayLiteralExpression);
        }
        else
        {
            arrayLiteralExpression  = array;
        }

        if (!ArrayDriver.isDuplicateArrayValue(arrayLiteralExpression, item)) arrayLiteralExpression?.addElement(item, { useNewLines: true });
    }

    private static isDuplicateArrayValue(array: ArrayLiteralExpression | undefined, item: string): boolean
    {
        // format string to avoid break spaces and extra white spaces
        const arrayItems = array?.getElements().map(i => i.getText()).map(j => j.replace(/(\r\n|\n|\r|\s)/gm,''));

        if (Array.isArray(arrayItems)) return arrayItems.includes(item.replace(/(\r\n|\n|\r|\s)/gm,''));

        return false;
    }

    /**
     * From the items array, only non-repeating items are returned.
     *
     * @param sourceFile
     * @param moduleNames
     */
    private static getUniqueArrayItems(array: ArrayLiteralExpression, items: string[]): string[]
    {
        // format string to avoid break spaces and extra white spaces
        const arrayItems = array?.getElements().map(i => i.getText()).map(j => j.replace(/(\r\n|\n|\r|\s)/gm,''));

        // filter only items where is not in array
        return items.filter(item => !arrayItems.includes(item));
    }
}