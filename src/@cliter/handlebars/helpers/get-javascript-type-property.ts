import * as handlebars from 'handlebars';
import { CliterConfig, Property, getJavascriptTypeProperty } from '../..';

handlebars.registerHelper('getJavascriptTypeProperty', function(
    property: Property,
    config: CliterConfig,
): string | undefined
{
    return getJavascriptTypeProperty(
        property,
        config,
    );
});
