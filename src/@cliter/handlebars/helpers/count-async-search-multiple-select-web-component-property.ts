import * as handlebars from 'handlebars';
import { Property, countAsyncSearchMultipleSelectWebComponentProperty } from '../..';

handlebars.registerHelper('countAsyncSearchMultipleSelectWebComponentProperty', function(
    properties: Property[],
): number
{
    return countAsyncSearchMultipleSelectWebComponentProperty(
        properties,
    );
});
