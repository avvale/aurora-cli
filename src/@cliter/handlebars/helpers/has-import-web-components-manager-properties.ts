import * as handlebars from 'handlebars';
import { Property } from '../../types';
import { getImportWebComponentsManagerProperties } from '../../utils';

handlebars.registerHelper('hasImportWebComponentsManagerProperties', function(
    {
        properties = [],
    }: {
        properties: Property[];
    },
    context,
)
{
    const importWebComponentsArr = getImportWebComponentsManagerProperties(properties, false);

    return importWebComponentsArr.length > 0;
});
