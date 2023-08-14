import * as handlebars from 'handlebars';
import { Property, gerDtoInputProperties } from '../..';

handlebars.registerHelper('gerDtoInputProperties', function(
    properties: Property[],
): Property[]
{
    return gerDtoInputProperties(properties);
});
