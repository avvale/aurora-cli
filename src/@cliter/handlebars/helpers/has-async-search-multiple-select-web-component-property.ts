import * as handlebars from 'handlebars';
import { Property, hasAsyncSearchMultipleSelectWebComponentProperty } from '../..';

handlebars.registerHelper('hasAsyncSearchMultipleSelectWebComponentProperty', function(
    properties: Property[],
): boolean
{
    return hasAsyncSearchMultipleSelectWebComponentProperty(
        properties,
    );
});
