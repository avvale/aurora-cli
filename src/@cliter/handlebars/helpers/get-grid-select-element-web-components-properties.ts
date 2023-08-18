import * as handlebars from 'handlebars';
import { Property, getGridSelectElementWebComponentsProperties } from '../..';

handlebars.registerHelper('getGridSelectElementWebComponentsProperties', function(
    properties: Property[],
): Property[]
{
    return getGridSelectElementWebComponentsProperties(
        properties,
    );
});
