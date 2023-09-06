import * as handlebars from 'handlebars';
import { Property, isPivotProperty } from '../..';

handlebars.registerHelper('isPivotProperty', function(
    property: Property,
): boolean
{
    return isPivotProperty(
        property,
    );
});
