import * as handlebars from 'handlebars';
import { Property, hasHasOneDecoratorProperty } from '../..';

handlebars.registerHelper('hasHasOneDecoratorProperty', function(
    property: Property,
): boolean
{
    return hasHasOneDecoratorProperty(
        property,
    );
});
