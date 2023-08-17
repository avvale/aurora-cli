import * as handlebars from 'handlebars';
import { Property, getPropertyStringEnumOptions } from '../..';

handlebars.registerHelper('getPropertyStringEnumOptions', function(
    property: Property,
): string | undefined
{
    return getPropertyStringEnumOptions(
        property,
    );
});
