import * as handlebars from 'handlebars';
import { CliterConfig, Property, getPropertyJavascriptDeleteType } from '../..';

handlebars.registerHelper('getPropertyJavascriptDeleteType', function(
    property: Property,
    config: CliterConfig,
): handlebars.SafeString | undefined
{
    const result = getPropertyJavascriptDeleteType(
        property,
        config,
    );
    return result ? new handlebars.SafeString(result) : undefined;
});
