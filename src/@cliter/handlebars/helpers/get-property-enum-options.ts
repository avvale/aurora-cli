import * as handlebars from 'handlebars';
import { Property, getPropertyEnumOptions } from '../..';

handlebars.registerHelper('getPropertyEnumOptions', function(
    property: Property,
): string[] | undefined
{
    return getPropertyEnumOptions(
        property,
    );
});
