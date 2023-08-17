import * as handlebars from 'handlebars';
import { Property, getReferenceKeyProperty } from '../..';

handlebars.registerHelper('getReferenceKeyProperty', function(
    property: Property,
): string
{
    return getReferenceKeyProperty(
        property,
    );
});
