import * as handlebars from 'handlebars';
import { CliterConfig, Property, getPropertyJavascriptUpdateType } from '../..';

handlebars.registerHelper('getPropertyJavascriptUpdateType', function(
    property: Property,
    config: CliterConfig,
): handlebars.SafeString | undefined
{
    const result = getPropertyJavascriptUpdateType(
        property,
        config,
    );
    return result ? new handlebars.SafeString(result) : undefined;
});
