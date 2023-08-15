import * as handlebars from 'handlebars';
import { Property, getRelationshipManyToManyProperties } from '../..';

handlebars.registerHelper('getRelationshipManyToManyProperties', function(
    properties: Property[],
): Property[]
{
    return getRelationshipManyToManyProperties(properties);
});
