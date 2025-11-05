import { Property, RelationshipType, isRelationshipProperty } from '../..';
import * as handlebars from 'handlebars';
import * as _ from 'lodash';

handlebars.registerHelper('isAllowProperty', function(
    moduleName: string,
    property: Property,
    {
        allowOneToManyRelationShip = false,
        allowManyToManyRelationShip = true,
        allowAutoIncrement = true,
    }: {
        allowOneToManyRelationShip: boolean;
        allowManyToManyRelationShip: boolean;
        allowAutoIncrement: boolean;
    },
): boolean
{
    if (property.isI18n)
    {
        return property.name !== 'id' &&
            property.name !== 'rowId' &&
            property.name !== _.camelCase(moduleName) + 'Id' &&
            property.name !== 'createdAt' &&
            property.name !== 'updatedAt' &&
            property.name !== 'deletedAt';
    }

    if (property.autoIncrement && !allowAutoIncrement) return false;

    // avoid print property of relationship
    if (isRelationshipProperty(property) && property.relationship?.type === RelationshipType.ONE_TO_MANY) return allowOneToManyRelationShip;
    if (isRelationshipProperty(property) && property.relationship?.type === RelationshipType.MANY_TO_MANY) return allowManyToManyRelationShip;

    return true;
});
