import * as handlebars from 'handlebars';
import { Property, getDefaultValueProperty } from '../..';

handlebars.registerHelper('getDefaultValueProperty', function(
    property: Property,
): string
{
    return getDefaultValueProperty(
        property,
    );
});
