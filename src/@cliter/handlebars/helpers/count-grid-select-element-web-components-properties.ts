import * as handlebars from 'handlebars';
import { Property, countGridSelectElementWebComponentsProperties } from '../..';

handlebars.registerHelper('countGridSelectElementWebComponentsProperties', function(
    properties: Property[],
): number
{
    return countGridSelectElementWebComponentsProperties(
        properties,
    );
});
