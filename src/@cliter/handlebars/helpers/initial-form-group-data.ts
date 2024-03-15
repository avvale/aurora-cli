/* eslint-disable complexity */
import { Property, PropertyType, RelationshipType } from '../..';
import * as handlebars from 'handlebars';

handlebars.registerHelper('initialFormGroupData', function(property: Property)
{
    switch (property.type)
    {
        case PropertyType.ARRAY:
            return '[]';

        case PropertyType.CHAR:
        case PropertyType.TEXT:
        case PropertyType.TIMESTAMP:
        case PropertyType.VARCHAR:
            return '\'\'';

        case PropertyType.ENUM:
        case PropertyType.INT:
        case PropertyType.SMALLINT:
        case PropertyType.JSON:
        case PropertyType.JSONB:
        case PropertyType.DATE:
        case PropertyType.DECIMAL:
            return 'null';

        case PropertyType.BOOLEAN:
            return 'false';

        case PropertyType.ID:
            if (property.relationship?.type === RelationshipType.MANY_TO_ONE)
                return 'null';
            return '\'\'';

        case PropertyType.RELATIONSHIP:
            if (property.relationship?.type === RelationshipType.MANY_TO_MANY)
                return '[]';
    }
});
