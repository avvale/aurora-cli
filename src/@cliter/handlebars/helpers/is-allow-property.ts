import { Property, RelationshipType } from '../..';
import * as handlebars from 'handlebars';
import * as _ from 'lodash';

handlebars.registerHelper('isAllowProperty', function(moduleName: string, property: Property): boolean
{
    if (property.isI18n)
    {
        return property.name !== 'id' &&
            property.name !== _.camelCase(moduleName) + 'Id' &&
            property.name !== 'createdAt' &&
            property.name !== 'updatedAt' &&
            property.name !== 'deletedAt';
    }

    // avoid print property of relationship
    if (property.isRelationship && property.relationship?.type === RelationshipType.ONE_TO_MANY) return false;

    return true;
});
