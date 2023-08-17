import * as handlebars from 'handlebars';
import { Property, countWebComponentsProperties } from '../..';

handlebars.registerHelper('countWebComponentsProperties', function(
    properties: Property[],
): number
{
    return countWebComponentsProperties(
        properties,
    );
});
