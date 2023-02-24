import { ColumnConfig, ColumnDataType } from '@aurora';

export const applicationColumnsConfig: ColumnConfig[] = [
    {
        type : ColumnDataType.STRING,
        field: 'code',
        sort : 'code',
    },
    {
        type : ColumnDataType.STRING,
        field: 'name',
        sort : 'name',
    },
    {
        type : ColumnDataType.STRING,
        field: 'secret',
        sort : 'secret',
    },
    {
        type : ColumnDataType.BOOLEAN,
        field: 'isMaster',
        sort : 'isMaster',
    },
];