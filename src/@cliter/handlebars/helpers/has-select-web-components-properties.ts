import { Property, hasSelectWebComponentsProperties } from '../..';
import * as handlebars from 'handlebars';

handlebars.registerHelper('hasSelectWebComponentsProperties', function(
    properties: Property[],
): boolean
{
    return hasSelectWebComponentsProperties(
        properties,
    );
});
