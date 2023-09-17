import * as handlebars from 'handlebars';
import { Property, isManyToManyRelationshipProperty } from '../..';

handlebars.registerHelper('isManyToManyRelationshipProperty', function(
    property: Property,
): boolean
{
    return isManyToManyRelationshipProperty(
        property,
    );
});
