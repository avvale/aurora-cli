import * as handlebars from 'handlebars';
import { Property, isTimezoneProperty } from '../..';

handlebars.registerHelper('isTimezoneProperty', function(
    property: Property,
): boolean
{
    return isTimezoneProperty(
        property,
    );
});
