import { ColumnDataType, GridColumnFilter, GridState } from '../../grid.types';
import { ContactOperator, Operator, QueryStatement } from '@aurora';
import groupBy from 'lodash-es/groupBy';


export const setQueryFilters = (gridState: GridState): QueryStatement =>
{
    if (!gridState) return {};

    const groupedFilters = groupBy(gridState.columnFilters, 'field');
    const pagination = {
        where : {},
        limit : gridState.limit,
        offset: gridState.offset,
        order : gridState.order,
    };

    for (const key of Object.keys(groupedFilters))
    {
        // if group only has one item, don't concat query with operator and/or
        if (groupedFilters[key].length === 1)
        {
            const filter: GridColumnFilter = groupedFilters[key][0];
            pagination.where[key] = {
                [filter.operator]: filter.value,
            };
        }
        else if (groupedFilters[key].length > 1)
        {
            pagination.where[key] = {
                [getContactOperator(groupedFilters[key][0].type)]: groupedFilters[key].map(filter => ({ [filter.operator]: filter.value })),
            };
        }
    }

    return pagination;
};

const getContactOperator = (columnDataType:ColumnDataType): ContactOperator =>
{
    switch (columnDataType)
    {
        case ColumnDataType.STRING:
            return Operator.or;
        case ColumnDataType.NUMBER:
            return Operator.and;
        case ColumnDataType.DATE:
            return Operator.and;
        default:
            return Operator.or;
    }
};
