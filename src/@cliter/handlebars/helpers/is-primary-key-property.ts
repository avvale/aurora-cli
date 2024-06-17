import * as handlebars from 'handlebars';
import { Property, isPrimaryKeyProperty } from '../..';

handlebars.registerHelper('isPrimaryKeyProperty', function(
    property: Property,
): boolean
{
    return isPrimaryKeyProperty(
        property,
    );
});
