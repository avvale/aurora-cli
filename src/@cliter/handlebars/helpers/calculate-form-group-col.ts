import { Property, SqlType } from '../..';
import * as handlebars from 'handlebars';

handlebars.registerHelper('calculateFormGroupCol', function(property: Property)
{
    switch (property.type)
    {
        case SqlType.CHAR:
            if (!property.length) return 'col-12';
            if (property.length < 11) return 'col-2';
            if (property.length < 31) return 'col-4';
            if (property.length < 51) return 'col-6';
            if (property.length < 71) return 'col-8';
            if (property.length < 91) return 'col-10';
            return 'col-12';

        case SqlType.BOOLEAN:
            return 'col-4';

        case SqlType.DATE:
        case SqlType.TIMESTAMP:
            return 'col-3';

        case SqlType.ENUM:
            return 'col-4';

        case SqlType.ID:
            return `col-6`;

        case SqlType.INT:
        case SqlType['INT.UNSIGNED']:
        case SqlType.SMALLINT:
        case SqlType['SMALLINT.UNSIGNED']:
            if (!property.maxLength) return 'col-12';
            if (property.maxLength < 11) return 'col-2';
            if (property.maxLength < 31) return 'col-4';
            if (property.maxLength < 51) return 'col-6';
            if (property.maxLength < 71) return 'col-8';
            if (property.maxLength < 91) return 'col-10';
            return 'col-12';

        case SqlType.TEXT:
            return 'col-12';

        case SqlType.VARCHAR:
            if (!property.maxLength) return 'col-12';
            if (property.maxLength < 11) return 'col-2';
            if (property.maxLength < 31) return 'col-4';
            if (property.maxLength < 51) return 'col-6';
            if (property.maxLength < 71) return 'col-8';
            if (property.maxLength < 91) return 'col-10';
            return 'col-12';
    }
});