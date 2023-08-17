import * as handlebars from 'handlebars';
import { Property, getWithRelationshipOneToManyProperties } from '../..';

handlebars.registerHelper('getWithRelationshipOneToManyProperties', function(
    properties: Property[],
): Property[]
{
    return getWithRelationshipOneToManyProperties(
        properties,
    );
});
