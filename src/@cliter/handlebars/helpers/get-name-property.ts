import * as handlebars from 'handlebars';
import { Property, getNameProperty } from '../..';

handlebars.registerHelper('getNameProperty', function(
    property: Property,
): string
{
    return getNameProperty(
        property,
    );
});
