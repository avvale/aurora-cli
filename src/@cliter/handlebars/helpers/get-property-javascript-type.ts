import * as handlebars from 'handlebars';
import { CliterConfig, Property, getPropertyJavascriptType } from '../..';

handlebars.registerHelper('getPropertyJavascriptType', function(
    property: Property,
    config: CliterConfig,
): string | undefined
{
    return getPropertyJavascriptType(
        property,
        config,
    );
});
