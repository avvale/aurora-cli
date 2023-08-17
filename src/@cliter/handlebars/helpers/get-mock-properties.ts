import * as handlebars from 'handlebars';
import { Property, getMockProperties } from '../..';

handlebars.registerHelper('getMockProperties', function(
    properties: Property[],
): Property[]
{
    return getMockProperties(
        properties,
    );
});
