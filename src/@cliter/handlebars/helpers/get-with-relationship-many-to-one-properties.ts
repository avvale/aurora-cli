import * as handlebars from 'handlebars';
import { Property, getWithRelationshipManyToOneProperties } from '../..';

handlebars.registerHelper('getWithRelationshipManyToOneProperties', function(
    properties: Property[],
): Property[]
{
    return getWithRelationshipManyToOneProperties(
        properties,
    );
});
