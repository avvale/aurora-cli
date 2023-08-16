import * as handlebars from 'handlebars';
import { CliterConfig, Property, getSwaggerTypeProperty } from '../..';

handlebars.registerHelper('getSwaggerTypeProperty', function(
    property: Property,
    config: CliterConfig,
): string
{
    return getSwaggerTypeProperty(
        property,
        config,
    );
});
