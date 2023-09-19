import * as handlebars from 'handlebars';
import { CliterConfig, Property, getPropertyJavascriptDeleteType } from '../..';

handlebars.registerHelper('getPropertyJavascriptDeleteType', function(
    property: Property,
    config: CliterConfig,
): string | undefined
{
    return getPropertyJavascriptDeleteType(
        property,
        config,
    );
});
