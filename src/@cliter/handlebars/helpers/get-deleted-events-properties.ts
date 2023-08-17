import * as handlebars from 'handlebars';
import { Property, getDeletedEventProperties } from '../..';

handlebars.registerHelper('getDeletedEventProperties', function(
    properties: Property[],
): Property[]
{
    return getDeletedEventProperties(
        properties,
    );
});
