import * as handlebars from 'handlebars';
import * as _ from 'lodash';
import { ImportStatement } from '../../types';

handlebars.registerHelper('importManager', function(
    {
        imports = [],
        sortImports = true,
    }: {
        imports: ImportStatement[];
        sortImports?: boolean;
    },
    context,
)
{
    const importsGrouped = _.groupBy(imports, 'path');
    let response = '';

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

        if (sortImports)
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
                response += `\t${item},\n`;
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
