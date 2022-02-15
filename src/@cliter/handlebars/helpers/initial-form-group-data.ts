import { Property, SqlType } from '../..';
import * as handlebars from 'handlebars';

handlebars.registerHelper('initialFormGroupData', function(property: Property)
{
    switch (property.type)
    {
        case SqlType.CHAR:
        case SqlType.DATE:
        case SqlType.ENUM:
        case SqlType.ID:
        case SqlType.TEXT:
        case SqlType.TIMESTAMP:
        case SqlType.VARCHAR:
            return `''`;

        case SqlType.INT:
        case SqlType['INT.UNSIGNED']:
        case SqlType.SMALLINT:
        case SqlType.JSON:
        case SqlType.DECIMAL:
        case SqlType['SMALLINT.UNSIGNED']:
            return `null`;

        case SqlType.BOOLEAN:
            return `false`;
    }
});