import * as handlebars from 'handlebars';
import { CliterConfig, Property, getPropertyJavascriptUpdateType } from '../..';

handlebars.registerHelper('getPropertyJavascriptUpdateType', function(
    property: Property,
    config: CliterConfig,
): string | undefined
{
    return getPropertyJavascriptUpdateType(
        property,
        config,
    );
});
