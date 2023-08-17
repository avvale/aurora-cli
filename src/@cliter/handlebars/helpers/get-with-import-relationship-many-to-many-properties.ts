import * as handlebars from 'handlebars';
import { Property, getWithImportRelationshipManyToManyProperties } from '../..';

handlebars.registerHelper('getWithImportRelationshipManyToManyProperties', function(
    properties: Property[],
): Property[]
{
    return getWithImportRelationshipManyToManyProperties(
        properties,
    );
});
