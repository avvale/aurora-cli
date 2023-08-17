import * as handlebars from 'handlebars';
import { Property, hasHasBelongsToManyDecoratorProperty } from '../..';

handlebars.registerHelper('hasHasBelongsToManyDecoratorProperty', function(
    property: Property,
): boolean
{
    return hasHasBelongsToManyDecoratorProperty(
        property,
    );
});
