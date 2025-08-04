export const arrayToMap = <T, E>(items: E[], indexKey: string = 'id'): Map<T, E> =>
{
    const map = new Map();
    for (const item of items)
    {
        map.set(item[indexKey], item);
    }
    return map;
};
