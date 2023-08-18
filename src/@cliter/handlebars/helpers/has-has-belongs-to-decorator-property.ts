import * as handlebars from 'handlebars';
import { Property, hasHasBelongsToDecoratorProperty } from '../..';

handlebars.registerHelper('hasHasBelongsToDecoratorProperty', function(
    property: Property,
): boolean
{
    return hasHasBelongsToDecoratorProperty(
        property,
    );
});
