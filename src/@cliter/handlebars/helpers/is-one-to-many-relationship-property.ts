import * as handlebars from 'handlebars';
import { Property, isOneToManyRelationshipProperty } from '../..';

handlebars.registerHelper('isOneToManyRelationshipProperty', function(
    property: Property,
): boolean
{
    return isOneToManyRelationshipProperty(
        property,
    );
});
