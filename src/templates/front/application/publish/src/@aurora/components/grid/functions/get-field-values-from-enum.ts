export const getFieldValuesFromEnum = <T>(enumVar: T, parseValue: (value: string) => string = value => value): { key: string; value: string; }[] =>
{
    return Object.keys(enumVar).map(key => ({ key, value: parseValue(enumVar[key]) }));
};
