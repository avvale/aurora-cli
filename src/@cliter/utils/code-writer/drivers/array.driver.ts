import { SourceFile, ArrayLiteralExpression, ObjectLiteralExpression, PropertyAssignment, StringLiteral } from 'ts-morph';
import { ProviderDriver } from './provider.driver';
import { getInitializer } from '../functions';

export class ArrayDriver
{
    /**
     * Add items in array
     *
     * @param sourceFile - The source file where the array is defined
     * @param items - The items to add to the array
     * @param array - The name of the array or Array literal where the items will be added
     * @returns void
     */
    public static addArrayItems(sourceFile: SourceFile, items: string[], array: string | ArrayLiteralExpression): void
    {
        let arrayLiteralExpression;

        if (typeof array === 'string')
        {
            const routesDeclaration = sourceFile?.getVariableDeclaration(array);
            arrayLiteralExpression  = <ArrayLiteralExpression>getInitializer(routesDeclaration);

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
     * Add item in array
     *
     * @param sourceFile - The source file where the array is defined
     * @param item - The item to add to the array
     * @param array - The name of the array or Array literal where the item will be added
     * @param finder - A function that determines if the item already exists in the array
     * @returns void
     */
    public static addArrayItem(sourceFile: SourceFile, item: string, array: string | ArrayLiteralExpression, finder?: (item: string, array: ArrayLiteralExpression | undefined) => boolean): void
    {
        let arrayLiteralExpression;

        if (typeof array === 'string')
        {
            const routesDeclaration = sourceFile?.getVariableDeclaration(array);
            arrayLiteralExpression = <ArrayLiteralExpression>getInitializer(routesDeclaration);
        }
        else
        {
            arrayLiteralExpression = array;
        }

        if (!ArrayDriver.isDuplicateArrayValue(arrayLiteralExpression, item, finder)) arrayLiteralExpression?.addElement(item, { useNewLines: true });
    }

    /**
     * Change provider value in providers array
     *
     * @param array - The array literal expression where the provider value will be changed
     * @param provide - The provider value to be changed
     * @param adapter - The new adapter value to be set
     * @returns void
     */
    public static changeProviderArray(array: ArrayLiteralExpression, provide: string, adapter: string): void
    {
        for (const [index, value] of array.getElements().entries())
        {
            if (value instanceof ObjectLiteralExpression)
            {
                const properties = value.getProperties() as PropertyAssignment[];
                let isProvideWanted = false;
                for (const property of properties)
                {
                    if (property.getName() === 'provide' && (<StringLiteral>getInitializer(property))?.getText() === provide)
                    {
                        isProvideWanted = true;
                    }

                    if (isProvideWanted && property.getName() === 'useClass')
                    {
                        property.setInitializer(adapter);
                        break;
                    }
                }
            }
        }
    }

    /**
     * remove provider from providers array
     *
     * @param array - The array literal expression where the provider value will be changed
     * @param provide - The provider value to be changed
     * @returns void
     */
    public static removeProviderArray(array: ArrayLiteralExpression, provide: string): void
    {
        for (const [index, value] of array.getElements().entries())
        {
            if (ProviderDriver.isProvideWanted(value as ObjectLiteralExpression, provide))
            {
                array.removeElement(index);
            }
        }
    }

    private static isDuplicateArrayValue(array: ArrayLiteralExpression | undefined, item: string, finder?: (item: string, array: ArrayLiteralExpression | undefined) => boolean): boolean
    {
        // format string to avoid break spaces and extra white spaces
        const arrayItems = array?.getElements().map(i => i.getText()).map(j => j.replace(/(\r\n|\n|\r|\s)/gm, ''));

        if (finder) return finder(item, array);

        if (Array.isArray(arrayItems)) return arrayItems.includes(item.replace(/(\r\n|\n|\r|\s)/gm, ''));

        return false;
    }

    /**
     * From the items array, only non-repeating items are returned.
     *
     * @param array - The array literal expression where the provider value will be changed
     * @param items - The items that will be filtered
     * @returns void
     */
    private static getUniqueArrayItems(array: ArrayLiteralExpression, items: string[]): string[]
    {
        // format string to avoid break spaces and extra white spaces
        const arrayItems = array?.getElements().map(i => i.getText()).map(j => j.replace(/(\r\n|\n|\r|\s)/gm,''));

        // filter only items where is not in array
        return items.filter(item => !arrayItems.includes(item));
    }
}
