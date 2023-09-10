import * as handlebars from 'handlebars';
import { Property, countMultipleSelectElementWebComponentsProperties } from '../..';

handlebars.registerHelper('countMultipleSelectElementWebComponentsProperties', function(
    properties: Property[],
): number
{
    return countMultipleSelectElementWebComponentsProperties(
        properties,
    );
});
