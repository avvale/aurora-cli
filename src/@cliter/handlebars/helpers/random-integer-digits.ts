import * as handlebars from 'handlebars';
import randomIntegerDigits from '../../utils/random-integer-digits';

handlebars.registerHelper('randomIntegerDigits', function (digits: number)
{
    return randomIntegerDigits(
        digits,
    );
});
