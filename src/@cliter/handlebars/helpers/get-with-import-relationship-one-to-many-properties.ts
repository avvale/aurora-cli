import * as handlebars from 'handlebars';
import { Property, getWithImportRelationshipOneToManyProperties } from '../..';

handlebars.registerHelper('getWithImportRelationshipOneToManyProperties', function(
    properties: Property[],
): Property[]
{
    return getWithImportRelationshipOneToManyProperties(
        properties,
    );
});
