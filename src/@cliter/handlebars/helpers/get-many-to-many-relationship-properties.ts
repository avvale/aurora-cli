import * as handlebars from 'handlebars';
import { Property, getManyToManyRelationshipProperties } from '../..';

handlebars.registerHelper('getManyToManyRelationshipProperties', function(
    properties: Property[],
): Property[]
{
    return getManyToManyRelationshipProperties(
        properties,
    );
});
