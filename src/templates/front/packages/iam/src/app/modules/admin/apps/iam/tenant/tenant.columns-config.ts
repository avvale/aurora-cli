import { ColumnConfig, ColumnDataType } from '@aurora';

export const tenantColumnsConfig: ColumnConfig[] = [
    {
        type : ColumnDataType.STRING,
        field: 'name',
        sort : 'name',
    },
    {
        type : ColumnDataType.STRING,
        field: 'code',
        sort : 'code',
    },
    {
        type : ColumnDataType.STRING,
        field: 'logo',
        sort : 'logo',
    },
    {
        type : ColumnDataType.BOOLEAN,
        field: 'isActive',
        sort : 'isActive',
    },
    {
        type : ColumnDataType.STRING,
        field: 'data',
        sort : 'data',
    },
    {
        type : ColumnDataType.STRING,
        field: 'accountIds',
        sort : 'accountIds',
    },
];