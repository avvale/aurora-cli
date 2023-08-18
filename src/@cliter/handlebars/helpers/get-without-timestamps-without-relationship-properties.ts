import * as handlebars from 'handlebars';
import { Property, getWithoutTimestampsWithoutRelationshipProperties } from '../..';

handlebars.registerHelper('getWithoutTimestampsWithoutRelationshipProperties', function(
    properties: Property[],
): Property[]
{
    return getWithoutTimestampsWithoutRelationshipProperties(
        properties,
    );
});
