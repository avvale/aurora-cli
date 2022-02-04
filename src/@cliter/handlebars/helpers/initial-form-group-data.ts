import { Property, SqlType } from '../..';
import * as handlebars from 'handlebars';

handlebars.registerHelper('initialFormGroupData', function(property: Property)
{
    switch (property.type)
    {
        case SqlType.VARCHAR:
        case SqlType.CHAR:
        case SqlType.TEXT:
        case SqlType.TIMESTAMP:
        case SqlType.TIMESTAMP:
        case SqlType.ENUM:
        case SqlType.ID:
            return `''`;

        case SqlType.INT:
        case SqlType['INT.UNSIGNED']:
        case SqlType.SMALLINT:
        case SqlType['SMALLINT.UNSIGNED']:
            return `null`;

        case SqlType.BOOLEAN:
            return `false`;
    }
});