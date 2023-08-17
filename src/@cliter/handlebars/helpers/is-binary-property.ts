import * as handlebars from 'handlebars';
import { Property, isBinaryProperty } from '../..';

handlebars.registerHelper('isBinaryProperty', function(
    property: Property,
): boolean
{
    return isBinaryProperty(
        property,
    );
});
