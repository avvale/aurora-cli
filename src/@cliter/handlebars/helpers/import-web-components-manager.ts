import * as handlebars from 'handlebars';
import { Property, PropertyType } from '../../types';

handlebars.registerHelper('importWebComponentsManager', function(
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
    const importWebComponents = new Set();

    for (const property of properties)
    {
        switch (property.type)
        {
            case PropertyType.BOOLEAN:
                importWebComponents.add('MatCheckboxModule');
                importWebComponents.add('NgForOf');
                break;

            case PropertyType.ENUM:
                importWebComponents.add('MatSelectModule');
                break;
        }
    }

    const importWebComponentsArr = [...importWebComponents];

    if (sortImports) importWebComponentsArr.sort();

    return importWebComponentsArr.join(', ') + ',';
});
