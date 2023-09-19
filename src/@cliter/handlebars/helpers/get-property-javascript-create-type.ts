import * as handlebars from 'handlebars';
import { CliterConfig, Property, getPropertyJavascriptCreateType } from '../..';

handlebars.registerHelper('getPropertyJavascriptCreateType', function(
    property: Property,
    config: CliterConfig,
): string | undefined
{
    return getPropertyJavascriptCreateType(
        property,
        config,
    );
});
