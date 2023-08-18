import * as handlebars from 'handlebars';
import { CliterConfig, Property, getPropertySequelizeType } from '../..';

handlebars.registerHelper('getPropertySequelizeType', function(
    property: Property,
    config: CliterConfig,
): string | undefined
{
    return getPropertySequelizeType(
        property,
        config,
    );
});
