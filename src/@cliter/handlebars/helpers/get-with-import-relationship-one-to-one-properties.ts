import * as handlebars from 'handlebars';
import { Property, getWithImportRelationshipOneToOneProperties } from '../..';

handlebars.registerHelper('getWithImportRelationshipOneToOneProperties', function(
    properties: Property[],
): Property[]
{
    return getWithImportRelationshipOneToOneProperties(
        properties,
    );
});
