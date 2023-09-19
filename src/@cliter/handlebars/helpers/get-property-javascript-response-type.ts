import * as handlebars from 'handlebars';
import { CliterConfig, Property, getPropertyJavascriptResponseType } from '../..';

handlebars.registerHelper('getPropertyJavascriptResponseType', function(
    property: Property,
    config: CliterConfig,
): string | undefined
{
    return getPropertyJavascriptResponseType(
        property,
        config,
    );
});
