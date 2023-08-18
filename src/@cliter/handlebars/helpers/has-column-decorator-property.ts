import * as handlebars from 'handlebars';
import { Property, hasColumnDecoratorProperty } from '../..';

handlebars.registerHelper('hasColumnDecoratorProperty', function(
    property: Property,
): boolean
{
    return hasColumnDecoratorProperty(
        property,
    );
});
