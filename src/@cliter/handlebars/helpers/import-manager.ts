import * as handlebars from 'handlebars';
import * as _ from 'lodash';
import { ImportStatement } from '../../types';

handlebars.registerHelper('importManager', function(
    {
        imports = [],
    }: {
        imports: ImportStatement[];
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
            else
            {
                if (!importsItems.includes(items)) importsItems.push(items);
            }
        }

        importsItems.sort();
        masterImport.items = importsItems;

        if (masterImport.defaultImport)
        {
            response += `import ${importsItems[0]} from '${path}';\n`;
        }
        else
        {
            if (masterImport.oneRowByItem)
            {
                response += `import {\n`;
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
    }

    return response;
});
