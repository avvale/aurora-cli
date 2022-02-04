import { Property } from '../..';
import * as handlebars from 'handlebars';

handlebars.registerHelper('hasValidationFormControl', function(property: Property)
{
    return !property.nullable || property.length || property.maxLength;
});