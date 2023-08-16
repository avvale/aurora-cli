import * as handlebars from 'handlebars';
import { Property, getBooleanProperties } from '../..';

handlebars.registerHelper('getBooleanProperties', function(
    properties: Property[],
): Property[]
{
    return getBooleanProperties(
        properties,
    );
});
