import * as handlebars from 'handlebars';
import { Property, hasBelongsToManyDecoratorProperty } from '../..';

handlebars.registerHelper('hasBelongsToManyDecoratorProperty', function(
    property: Property,
): boolean
{
    return hasBelongsToManyDecoratorProperty(
        property,
    );
});
