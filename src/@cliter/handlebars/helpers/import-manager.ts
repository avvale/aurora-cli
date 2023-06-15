import * as handlebars from 'handlebars';
import * as _ from 'lodash';
import { ImportStatement } from '../../types';

handlebars.registerHelper('importManager', function(
    {
        imports = [],
        sortImports = true,
        sortImportedClasses = true,
    }: {
        imports: ImportStatement[];
        sortImports?: boolean;
        sortImportedClasses?: boolean;
    },
    context,
)
{
    let importsGrouped = _.groupBy<ImportStatement>(imports, 'path') as { [path: string]: ImportStatement[] };
    let response = '';

    if (sortImports)
    {
        // sort imports by path
        const importsGroupedSorted: { [path: string]: ImportStatement[] } = {};
        const paths = Object.keys(importsGrouped);
        paths.sort((a, b) =>
        {
            const nameA = a.toLowerCase();
            const nameB = b.toLowerCase();
            if (nameA < nameB) return -1;
            if (nameA > nameB) return 1;
            return 0;
        });

        for (const path of paths)
        {
            importsGroupedSorted[path] = importsGrouped[path];
        }

        importsGrouped = importsGroupedSorted;
    }

    for (const [path, imports] of Object.entries(importsGrouped))
    {
        const importsItems: string[] = [];
        const masterImport = imports[0];
        for (const { items, defaultImport } of imports)
        {
            if (Array.isArray(items))
            {
                for (const item of items)
                {
                    if (!importsItems.includes(item)) importsItems.push(item);
                }
            }
            else if (!importsItems.includes(items)) importsItems.push(items);
        }

        if (sortImportedClasses)
        {
            // sort injections by variableName
            importsItems.sort((a, b) =>
            {
                const nameA = a.toLowerCase();
                const nameB = b.toLowerCase();
                if (nameA < nameB) return -1;
                if (nameA > nameB) return 1;
                return 0;
            });
        }

        masterImport.items = importsItems;

        if (masterImport.defaultImport)
        {
            response += `import ${importsItems[0]} from '${path}';\n`;
        }
        else if (masterImport.oneRowByItem)
        {
            response += 'import {\n';
            for (const item of importsItems)
            {
                response += `    ${item},\n`;
            }

            response += `} from '${path}';\n`;
        }
        else
        {
            response += `import { ${importsItems.join(', ')} } from '${path}';\n`;
        }
    }

    return response;
});
