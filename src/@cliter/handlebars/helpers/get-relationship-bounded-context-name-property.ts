import * as handlebars from 'handlebars';
import { Property, getRelationshipBoundedContextName } from '../..';

handlebars.registerHelper('getRelationshipBoundedContextName', function(
    property: Property,
): string | null
{
    return getRelationshipBoundedContextName(property);
});
