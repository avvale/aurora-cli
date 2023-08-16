import * as handlebars from 'handlebars';
import { Property, getCreatedEventProperties } from '../..';

handlebars.registerHelper('getCreatedEventProperties', function(
    properties: Property[],
): Property[]
{
    return getCreatedEventProperties(
        properties,
    );
});
