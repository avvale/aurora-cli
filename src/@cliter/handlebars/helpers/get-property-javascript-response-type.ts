import * as handlebars from 'handlebars';
import { CliterConfig, Property, getPropertyJavascriptResponseType } from '../..';

handlebars.registerHelper('getPropertyJavascriptResponseType', function(
    property: Property,
    config: CliterConfig,
): handlebars.SafeString | undefined
{
    const result = getPropertyJavascriptResponseType(
        property,
        config,
    );
    return result ? new handlebars.SafeString(result) : undefined;
});
