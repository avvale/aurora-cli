import { Property, PropertyType, WebComponentType } from '../..';
import * as handlebars from 'handlebars';

handlebars.registerHelper('calculateFormGroupCol', function(property: Property)
{
    switch (property.type)
    {
        case PropertyType.CHAR:
            if (!property.length) return 'col-12';
            if (property.length < 11) return 'col-2';
            if (property.length < 31) return 'col-4';
            if (property.length < 51) return 'col-6';
            if (property.length < 71) return 'col-8';
            if (property.length < 91) return 'col-10';
            return 'col-12';

        case PropertyType.BOOLEAN:
            return 'col-4';

        case PropertyType.DATE:
        case PropertyType.TIMESTAMP:
        case PropertyType.ENUM:
            return 'col-4';

        case PropertyType.ID:
            if (property.webComponent?.type === WebComponentType.GRID_SELECT_ELEMENT) return 'col-start-1 col-6';
            return `col-6`;

        case PropertyType.INT:
        case PropertyType['INT.UNSIGNED']:
        case PropertyType.SMALLINT:
        case PropertyType['SMALLINT.UNSIGNED']:
            if (!property.maxLength) return 'col-12';
            if (property.maxLength < 11) return 'col-2';
            if (property.maxLength < 31) return 'col-4';
            if (property.maxLength < 51) return 'col-6';
            if (property.maxLength < 71) return 'col-8';
            if (property.maxLength < 91) return 'col-10';
            return 'col-12';

        case PropertyType.DECIMAL:
            if (!property.decimals) return 'col-12';
            if (property.decimals[0] < 11) return 'col-2';
            if (property.decimals[0] < 31) return 'col-4';
            if (property.decimals[0] < 51) return 'col-6';
            if (property.decimals[0] < 71) return 'col-8';
            if (property.decimals[0] < 91) return 'col-10';
            return 'col-12';

        case PropertyType.TEXT:
            return 'col-12';

        case PropertyType.VARCHAR:
            if (!property.maxLength) return 'col-12';
            if (property.maxLength < 11) return 'col-2';
            if (property.maxLength < 31) return 'col-4';
            if (property.maxLength < 51) return 'col-6';
            if (property.maxLength < 71) return 'col-8';
            if (property.maxLength < 91) return 'col-10';
            return 'col-12';

        case PropertyType.RELATIONSHIP:
            if (property.webComponent?.type === WebComponentType.MULTIPLE_SELECT) return 'col-6';
            return `col-12`;
    }
});