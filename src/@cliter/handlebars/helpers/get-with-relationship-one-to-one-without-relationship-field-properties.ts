import * as handlebars from 'handlebars';
import { Property, getWithRelationshipOneToOneWithoutRelationshipFieldProperties } from '../..';

handlebars.registerHelper('getWithRelationshipOneToOneWithoutRelationshipFieldProperties', function(
    properties: Property[],
): Property[]
{
    return getWithRelationshipOneToOneWithoutRelationshipFieldProperties(
        properties,
    );
});
