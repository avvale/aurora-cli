import { Order, QueryStatement } from './sql-statement';
import merge from 'lodash-es/merge';

export class Criteria
{
    /**
     * get arguments for pagination query
     */
    static getPaginationDefaultValuesQueryStatement(
        {
            query = {},
            defaultWhere = {},
            defaultOffset = 0,
            defaultLimit = 10,
            defaultOrderField = 'createdAt',
            defaultOrderDirection = Order.DESC,
        }: {
            query?: QueryStatement;
            defaultWhere?: any;
            defaultOffset?: number;
            defaultLimit?: number;
            defaultOrderField?: string;
            defaultOrderDirection?: any;
        } = {},
    ): QueryStatement
    {
        return {
            where : defaultWhere,
            offset: defaultOffset,
            limit : defaultLimit,
            ...query,
            order : [[
                (Array.isArray(query.order) && Array.isArray(query.order[0]) && query.order[0][0] ? query.order[0][0] : defaultOrderField),
                (Array.isArray(query.order) && Array.isArray(query.order[0]) && query.order[0][1] ? query.order[0][1] : defaultOrderDirection),
            ]],
        };
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