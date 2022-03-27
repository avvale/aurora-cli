import randomIntegerDigits from './random-integer-digits';

const randomDecimalDigits = (totalDigits: number, decimalDigits: number): number =>
{
    return Number.parseFloat(randomIntegerDigits(totalDigits - decimalDigits) + '.' + randomIntegerDigits(decimalDigits, true));
};

export default randomDecimalDigits;
