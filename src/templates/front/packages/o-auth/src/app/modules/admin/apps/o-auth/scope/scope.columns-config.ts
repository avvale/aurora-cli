import { ColumnConfig, ColumnDataType } from '@aurora';

export const scopeColumnsConfig: ColumnConfig[] = [
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
];