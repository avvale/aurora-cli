export const isValidOrderStatement = (order: any): boolean =>
{
    if (!order) return false;
    if (!Array.isArray(order)) return false;
    if (order.length === 0) return false;

    for (const orderItem of order)
    {
        // check that order is array orderItem: ["createdAt", "desc"]
        if (!Array.isArray(orderItem)) return false;

        // check length order item: ["association", "createdAt", "desc"] or ["createdAt", "desc"] or ["createdAt"]
        if (orderItem.length === 0) return false;

        // check length direction item in not empty: ["createdAt", ""]
        if (orderItem.at(-1) === '') return false;

        // check type of order statement is string: ["association", "createdAt", "desc"]
        for (const orderStatement of orderItem)
        {
            if (typeof orderStatement !== 'string') return false;
        }
    }
    return true;
};