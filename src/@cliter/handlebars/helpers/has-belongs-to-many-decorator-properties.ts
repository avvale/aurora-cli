import * as handlebars from 'handlebars';
import { Property, hasBelongsToManyDecoratorProperties } from '../..';

handlebars.registerHelper('hasBelongsToManyDecoratorProperties', function(
    properties: Property[],
): boolean
{
    return hasBelongsToManyDecoratorProperties(
        properties,
    );
});
