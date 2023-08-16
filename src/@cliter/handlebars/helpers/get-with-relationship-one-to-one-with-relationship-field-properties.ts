import * as handlebars from 'handlebars';
import { Property, getWithRelationshipOneToOneWithRelationshipFieldProperties } from '../..';

handlebars.registerHelper('getWithRelationshipOneToOneWithRelationshipFieldProperties', function(
    properties: Property[],
): Property[]
{
    return getWithRelationshipOneToOneWithRelationshipFieldProperties(
        properties,
    );
});
