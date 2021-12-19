import { ExportDeclaration, SourceFile } from 'ts-morph';

export class ExportDriver
{
    /**
     * Create export in file
     *
     * @param sourceFile
     * @param modules
     * @param path
     */
    public static createExportItems(sourceFile: SourceFile, path: string, items?: string[]): void
    {
        const exportPaths: string[] = ExportDriver.getExportPaths(sourceFile);

        // declare export * from ''
        if (!exportPaths.includes(path) && !items) sourceFile.addExportDeclaration({ moduleSpecifier: path });

        // return void to try declare export * from '' and already exists
        if (!items) return;

        const itemsToExport: string[]   = ExportDriver.getUniqueExportItems(sourceFile, items);

        // need at less one item to export
        if (itemsToExport.length === 0) return;

        // if exist path add item to export
        if (exportPaths.includes(path))
        {
            // check this export not exist yet
            const exportElement = sourceFile.getExportDeclaration(path);
            const itemsToExportChecked: string[] = [];
            for (const itemToExport of itemsToExport)
            {
                let existItem = false;
                for(const exportedElement of exportElement?.getNamedExports() ? exportElement?.getNamedExports() : [])
                {
                    if (exportedElement.getName() === itemToExport) existItem = true;
                }
                if (!existItem) itemsToExportChecked.push(itemToExport);
            }

            // add export after check that is not repeated
            if (itemsToExportChecked.length > 0) exportElement?.addNamedExports(itemsToExportChecked);
        }
        // create new export
        else
        {
            sourceFile.addExportDeclaration({
                namedExports   : itemsToExport,
                moduleSpecifier: path
            });
        }
    }

    /**
     * From the items array, only non-repeating items are returned.
     *
     * @param sourceFile
     * @param moduleNames
     */
    private static getUniqueExportItems(sourceFile: SourceFile, items: string[]): string[]
    {
        // get export to avoid duplicities
        const exports = sourceFile.getExportDeclarations();

        // get names exported
        const itemsExported = exports.flatMap(i => i.getNamedExports().map(j => j.getName()));

        return items.filter(item => !itemsExported.includes(item));
    }

    /**
     * Return export paths from source
     *
     * @param sourceFile
     */
    private static getExportPaths(sourceFile: SourceFile): string[]
    {
        const exports: ExportDeclaration[] = sourceFile.getExportDeclarations();
        const paths: string[] = [];
        for (const exportObj of exports)
        {
            paths.push(exportObj.getModuleSpecifier().getLiteralValue());
        }
        return paths;
    }
}