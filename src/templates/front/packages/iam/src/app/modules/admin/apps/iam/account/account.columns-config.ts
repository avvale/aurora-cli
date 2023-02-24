import { ColumnConfig, ColumnDataType } from '@aurora';

export const accountColumnsConfig: ColumnConfig[] = [
    {
        type : ColumnDataType.STRING,
        field: 'type',
        sort : 'type',
    },
    {
        type : ColumnDataType.STRING,
        field: 'code',
        sort : 'code',
    },
    {
        type : ColumnDataType.STRING,
        field: 'scopes',
        sort : 'scopes',
    },
    {
        type : ColumnDataType.STRING,
        field: 'email',
        sort : 'email',
    },
    {
        type : ColumnDataType.BOOLEAN,
        field: 'isActive',
        sort : 'isActive',
    },
];