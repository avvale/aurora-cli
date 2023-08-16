import * as handlebars from 'handlebars';
import { Property, countSelectElementWebComponentsProperties } from '../..';

handlebars.registerHelper('countSelectElementWebComponentsProperties', function(
    properties: Property[],
): number
{
    return countSelectElementWebComponentsProperties(
        properties,
    );
});
