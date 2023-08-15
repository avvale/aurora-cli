import * as handlebars from 'handlebars';
import { Property, getUpdatedEventProperties } from '../..';

handlebars.registerHelper('getUpdatedEventProperties', function(
    properties: Property[],
): Property[]
{
    return getUpdatedEventProperties(properties);
});
