import * as handlebars from 'handlebars';
import { Property, hasHasOneDecoratorProperties } from '../..';

handlebars.registerHelper('hasHasOneDecoratorProperties', function(
    properties: Property[],
): boolean
{
    return hasHasOneDecoratorProperties(
        properties,
    );
});
