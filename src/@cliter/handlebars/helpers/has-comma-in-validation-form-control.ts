import { Property } from '../..';
import * as handlebars from 'handlebars';

handlebars.registerHelper('hasCommaInValidationFormControl', function(property: Property, validation: string)
{
    if (validation === 'nullable' && (property.length || property.maxLength)) return ', ';
    if (validation === 'length' && property.maxLength) return ', ';
    if (validation === 'maxLength') return '';
    return '';
});