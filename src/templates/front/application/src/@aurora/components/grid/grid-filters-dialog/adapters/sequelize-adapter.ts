import { ColumnDataType, FilterOperator, GridColumnFilter } from '../../grid.types';
import { ContactOperator, Operator } from '@aurora';

export const getContactOperator = (columnDataType:ColumnDataType): ContactOperator =>
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

export const getPostgresValueModifier = (gridColumnFilter: GridColumnFilter): string | number =>
{
    if (gridColumnFilter.type !== ColumnDataType.STRING) return gridColumnFilter.value;

    switch (gridColumnFilter.operator)
    {
        case Operator.startsWith:
            return `${gridColumnFilter.value}%`;

        case Operator.endsWith:
            return `%${gridColumnFilter.value}`;

        case Operator.substring:
            return `%${gridColumnFilter.value}%`;

        default:
            return gridColumnFilter.value;
    }
};

export const getPostgresOperatorModifier = (gridColumnFilter: GridColumnFilter): FilterOperator =>
{
    if (gridColumnFilter.type !== ColumnDataType.STRING) return gridColumnFilter.operator;

    switch (gridColumnFilter.operator)
    {
        case Operator.startsWith:
            return Operator.iLike;

        case Operator.endsWith:
            return Operator.iLike;

        case Operator.substring:
            return Operator.iLike;

        case Operator.eq:
            return Operator.iLike;

        case Operator.ne:
            return Operator.notILike;

        default:
            return gridColumnFilter.operator;
    }
};
