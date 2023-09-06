import * as handlebars from 'handlebars';
import { Property, hasBelongsToDecoratorProperty } from '../..';

handlebars.registerHelper('hasBelongsToDecoratorProperty', function(
    property: Property,
): boolean
{
    return hasBelongsToDecoratorProperty(
        property,
    );
});
