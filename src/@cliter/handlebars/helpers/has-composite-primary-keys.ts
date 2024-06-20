import * as handlebars from 'handlebars';
import { Property, hasCompositePrimaryKeys } from '../..';

handlebars.registerHelper('hasCompositePrimaryKeys', function(
    properties: Property[],
): boolean
{
    return hasCompositePrimaryKeys(
        properties,
    );
});
