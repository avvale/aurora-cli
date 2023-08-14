import * as handlebars from 'handlebars';
import { CliterConfig, Property, getDtoTypeProperty } from '../..';

handlebars.registerHelper('getDtoTypeProperty', function(
    property: Property,
    config: CliterConfig,
): string
{
    return getDtoTypeProperty(property, config);
});
