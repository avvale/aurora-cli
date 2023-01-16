import { ColumnDataType } from '../../grid.types';
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
