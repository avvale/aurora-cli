const randomIntegerDigits = (digits: number, avoidEndZero = false): number =>
{
    let n1 = 1;
    let n2 = 9;

    if (digits > 1)
    {
        const multiplier = 10 ** (digits - 1);
        n1 *= multiplier;
        n2 *= multiplier;
    }

    const value = Math.floor(n1 + (Math.random() * n2));

    return value % 10 === 0 && avoidEndZero ? randomIntegerDigits(digits, avoidEndZero) : value;
};

export default randomIntegerDigits;
