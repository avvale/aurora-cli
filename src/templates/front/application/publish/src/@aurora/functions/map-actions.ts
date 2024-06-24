export const mapActions = (action: string, map: { [key: string]: string; }): string =>
{
    if (!map[action]) throw new Error(`Action ${action} has no results in the mapping set`);
    return map[action];
};
