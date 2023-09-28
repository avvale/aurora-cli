import * as handlebars from 'handlebars';
import { Property, PropertyType } from '../../types';
import { hasI18nProperties, timestampProperties } from '../../utils';

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

    if (hasI18nProperties(properties)) importWebComponents.add('FlagLangComponent');

    for (const property of properties)
    {
        // avoid evaluating timestamp properties
        if (timestampProperties.includes(property.name)) continue;

        switch (property.type)
        {
            case PropertyType.BOOLEAN:
                importWebComponents.add('MatCheckboxModule');
                importWebComponents.add('NgForOf');
                break;

            case PropertyType.ENUM:
                importWebComponents.add('MatSelectModule');
                importWebComponents.add('NgForOf');
                break;

            case PropertyType.TIMESTAMP:
                importWebComponents.add('MtxDatetimepickerModule');
                break;
        }
    }

    const importWebComponentsArr = [...importWebComponents];

    if (sortImports) importWebComponentsArr.sort();

    return importWebComponentsArr.join(', ') + ',';
});
