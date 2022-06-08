import { Order, QueryStatement } from './sql-statement';
import merge from 'lodash-es/merge';

export class Criteria
{
    /**
     * get arguments for pagination query
     *
     * @param args
     * @param offset
     * @param limit
     * @param sort
     * @param order
     */
    static getPaginationQueryStatement(
        {
            query = {},
            offset = 0,
            limit = 10,
            sort = 'name',
            order = 'desc',
        }: {
            query?: QueryStatement;
            offset?: number;
            limit?: number;
            sort?: string | string[];
            order?: string;
        } = {},
    ): QueryStatement
    {
        order = order === 'asc' ? Order.ASC : Order.DESC;

        return merge({
            limit,
            offset,
            order: Array.isArray(sort) ? [[...sort, order]] : [[sort, order]],
        }, query);
    }

    static getFindByIdArguments(
        {
            id = '',
        }: {
            id?: string;
        } = {},
    ): QueryStatement
    {
        return merge({
            where: { id },
        }, {});
    }
}