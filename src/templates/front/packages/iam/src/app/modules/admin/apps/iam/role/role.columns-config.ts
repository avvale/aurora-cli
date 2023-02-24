import { ColumnConfig, ColumnDataType } from '@aurora';

export const roleColumnsConfig: ColumnConfig[] = [
    {
        type : ColumnDataType.STRING,
        field: 'name',
        sort : 'name',
    },
    {
        type : ColumnDataType.BOOLEAN,
        field: 'isMaster',
        sort : 'isMaster',
    },
];