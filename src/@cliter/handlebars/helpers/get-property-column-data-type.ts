import * as handlebars from 'handlebars';
import { CliterConfig, Property, getPropertyColumnDataType } from '../..';

handlebars.registerHelper('getPropertyColumnDataType', function(
    property: Property,
    config: CliterConfig,
): string
{
    return getPropertyColumnDataType(
        property,
        config,
    );
});
