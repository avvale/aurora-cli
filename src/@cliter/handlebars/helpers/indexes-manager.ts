import * as handlebars from 'handlebars';
import * as _ from 'lodash';
import { Property } from '../../types';

handlebars.registerHelper('indexesManager', function(
    {
        indexProperties = [],
        isI18n = false,
    }: {
        indexProperties: Property[];
        isI18n: boolean;
    },
    context,
)
{
    let response = '';

    for (const [i, indexProperty] of indexProperties.entries())
    {
        response += '\t\t{\n';
        response += '\t\t\tfields: [';

        if (Array.isArray(indexProperty.indexFields))
        {
            for (const [j, indexField] of indexProperty.indexFields.entries())
            {
                if (j === indexProperty.indexFields.length - 1)
                {
                    response += `'${indexField}'`;
                    continue;
                }

                response += `'${indexField}', `;
            }
        }
        else
        {
            response += `'${indexProperty.name}'`;
        }

        response += '],\n';
        response += `\t\t\tunique: ${indexProperty.index === 'unique' ? 'true' : 'false'},\n`;
        if (indexProperty.indexName) response += `\t\t\tname: '${indexProperty.indexName}',\n`;
        response += `\t\t},${i === indexProperties.length - 1 ? '' : '\n'}`;
    }

    return response;
});
