import * as handlebars from 'handlebars';
import { Property, getWithRelationshipOneToOneProperties } from '../..';

handlebars.registerHelper('getWithRelationshipOneToOneProperties', function(
    properties: Property[],
): Property[]
{
    return getWithRelationshipOneToOneProperties(
        properties,
    );
});
