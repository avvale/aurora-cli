import * as handlebars from 'handlebars';
import { Property, hasBelongsToDecoratorProperties } from '../..';

handlebars.registerHelper('hasBelongsToDecoratorProperties', function(
    properties: Property[],
): boolean
{
    return hasBelongsToDecoratorProperties(
        properties,
    );
});
