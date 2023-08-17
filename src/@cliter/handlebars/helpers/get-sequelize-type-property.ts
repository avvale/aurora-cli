import * as handlebars from 'handlebars';
import { CliterConfig, Property, getSequelizeTypeProperty } from '../..';

handlebars.registerHelper('getSequelizeTypeProperty', function(
    property: Property,
    config: CliterConfig,
): string | undefined
{
    return getSequelizeTypeProperty(
        property,
        config,
    );
});
