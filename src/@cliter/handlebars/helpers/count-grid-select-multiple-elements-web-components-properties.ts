import * as handlebars from 'handlebars';
import { Property, countGridSelectMultipleElementsWebComponentsProperties } from '../..';

handlebars.registerHelper('countGridSelectMultipleElementsWebComponentsProperties', function(
    properties: Property[],
): number
{
    return countGridSelectMultipleElementsWebComponentsProperties(
        properties,
    );
});
