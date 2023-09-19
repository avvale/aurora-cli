import * as handlebars from 'handlebars';
import { Property, hasForeignKeyDecoratorProperties } from '../..';

handlebars.registerHelper('hasForeignKeyDecoratorProperties', function(
    properties: Property[],
): boolean
{
    return hasForeignKeyDecoratorProperties(
        properties,
    );
});
