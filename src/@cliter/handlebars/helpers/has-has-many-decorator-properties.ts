import * as handlebars from 'handlebars';
import { Property, hasHasManyDecoratorProperties } from '../..';

handlebars.registerHelper('hasHasManyDecoratorProperties', function(
    properties: Property[],
): boolean
{
    return hasHasManyDecoratorProperties(
        properties,
    );
});
