import * as handlebars from 'handlebars';
import { CliterConfig, Property, getPropertyJavascriptCreateType } from '../..';

handlebars.registerHelper('getPropertyJavascriptCreateType', function(
    property: Property,
    config: CliterConfig,
): handlebars.SafeString | undefined
{
    const result = getPropertyJavascriptCreateType(
        property,
        config,
    );
    return result ? new handlebars.SafeString(result) : undefined;
});
