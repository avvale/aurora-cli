import { ColumnConfig, ColumnDataType } from '@aurora';

export const boundedContextColumnsConfig: ColumnConfig[] = [
    {
        type : ColumnDataType.STRING,
        field: 'name',
        sort : 'name',
    },
    {
        type : ColumnDataType.STRING,
        field: 'root',
        sort : 'root',
    },
    {
        type : ColumnDataType.NUMBER,
        field: 'sort',
        sort : 'sort',
    },
    {
        type : ColumnDataType.BOOLEAN,
        field: 'isActive',
        sort : 'isActive',
    },
];