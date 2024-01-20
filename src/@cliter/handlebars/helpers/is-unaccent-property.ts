import * as handlebars from 'handlebars';
import { CliterConfig, Property, isUnaccentProperty } from '../..';

handlebars.registerHelper('isUnaccentProperty', function(
    property: Property,
    config: CliterConfig,
): boolean
{
    return isUnaccentProperty(
        property,
        config,
    );
});
