import * as handlebars from 'handlebars';
import { CliterConfig, Property, getJavascriptModelTypeProperty } from '../..';

handlebars.registerHelper('getJavascriptModelTypeProperty', function(
    property: Property,
    config: CliterConfig,
): string | undefined
{
    return getJavascriptModelTypeProperty(
        property,
        config,
    );
});
