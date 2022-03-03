const randomNumber = (maxLength: number): number =>
{
    return Math.floor(Number(1 + '0'.repeat(maxLength - 1)) + (Math.random() * Number(9 + '0'.repeat(maxLength - 1))));
};

export default randomNumber;
