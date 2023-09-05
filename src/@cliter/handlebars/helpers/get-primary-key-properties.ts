import * as handlebars from 'handlebars';
import { Property, getPrimaryKeyProperties } from '../..';

handlebars.registerHelper('getPrimaryKeyProperties', function(
    properties: Property[],
): Property[]
{
    return getPrimaryKeyProperties(
        properties,
    );
});
