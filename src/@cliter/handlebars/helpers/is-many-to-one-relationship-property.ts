import * as handlebars from 'handlebars';
import { Property, isManyToOneRelationshipProperty } from '../..';

handlebars.registerHelper('isManyToOneRelationshipProperty', function(
    property: Property,
): boolean
{
    return isManyToOneRelationshipProperty(
        property,
    );
});
