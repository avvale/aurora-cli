import * as handlebars from 'handlebars';
import { Property, getWithImportRelationshipManyToOneProperties } from '../..';

handlebars.registerHelper('getWithImportRelationshipManyToOneProperties', function(
    properties: Property[],
): Property[]
{
    return getWithImportRelationshipManyToOneProperties(
        properties,
    );
});
