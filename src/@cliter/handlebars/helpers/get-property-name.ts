import * as handlebars from 'handlebars';
import { Property, getPropertyName } from '../..';

handlebars.registerHelper('getPropertyName', function(
    property: Property,
): string
{
    return getPropertyName(
        property,
    );
});
