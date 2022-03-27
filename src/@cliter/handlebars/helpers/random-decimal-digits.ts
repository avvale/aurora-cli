import * as handlebars from 'handlebars';
import randomDecimalDigits from '../../utils/random-decimal-digits';

handlebars.registerHelper('randomDecimalDigits', function (totalDigits: number, decimalDigits: number)
{
    return randomDecimalDigits(totalDigits, decimalDigits);
});
