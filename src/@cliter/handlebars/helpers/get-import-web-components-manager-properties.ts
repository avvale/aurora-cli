import * as handlebars from 'handlebars';
import { Property } from '../../types';
import { getImportWebComponentsManagerProperties } from '../../utils';

handlebars.registerHelper('getImportWebComponentsManagerProperties', function(
    {
        properties = [],
        sortImports = true,
    }: {
        properties: Property[];
        sortImports?: boolean;
    },
    context,
)
{
    const importWebComponentsArr = getImportWebComponentsManagerProperties(properties, sortImports);

    return importWebComponentsArr.length > 0 ? importWebComponentsArr.join(', ') + ',' : '';
});
