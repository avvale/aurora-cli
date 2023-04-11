import { Property, PropertyType } from '../..';
import * as handlebars from 'handlebars';

handlebars.registerHelper('initialFormGroupData', function(property: Property)
{
    switch (property.type)
    {
        case PropertyType.CHAR:
        case PropertyType.ENUM:
        case PropertyType.ID:
        case PropertyType.TEXT:
        case PropertyType.TIMESTAMP:
        case PropertyType.VARCHAR:
            return `''`;

        case PropertyType.INT:
        case PropertyType['INT.UNSIGNED']:
        case PropertyType.SMALLINT:
        case PropertyType.JSON:
        case PropertyType.DATE:
        case PropertyType.DECIMAL:
        case PropertyType['SMALLINT.UNSIGNED']:
            return `null`;

        case PropertyType.BOOLEAN:
            return `false`;
    }
});