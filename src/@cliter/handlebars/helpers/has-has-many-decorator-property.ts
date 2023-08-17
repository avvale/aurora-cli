import * as handlebars from 'handlebars';
import { Property, hasHasManyDecoratorProperty } from '../..';

handlebars.registerHelper('hasHasManyDecoratorProperty', function(
    property: Property,
): boolean
{
    return hasHasManyDecoratorProperty(
        property,
    );
});
