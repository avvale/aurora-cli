import * as handlebars from 'handlebars';
import { Property, isRelationshipProperty } from '../..';

handlebars.registerHelper('isRelationshipProperty', function(
    property: Property,
): boolean
{
    return isRelationshipProperty(
        property,
    );
});
