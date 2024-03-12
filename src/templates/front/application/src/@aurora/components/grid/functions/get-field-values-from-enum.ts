export const getFieldValuesFromEnum = <T>(enumVar: T): { key: string; value: string; }[] =>
{
    return Object.keys(enumVar).map(key => ({ key, value: enumVar[key] }));
};
