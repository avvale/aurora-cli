import { ColumnConfig, ColumnDataType } from '@aurora';

export const roleColumnsConfig: ColumnConfig[] = [
    {
        type       : ColumnDataType.STRING,
        field      : 'name',
        sort       : 'name',
        translation: 'Name',
        isUnaccent : true,
    },
    {
        type       : ColumnDataType.BOOLEAN,
        field      : 'isMaster',
        sort       : 'isMaster',
        translation: 'IsMaster',
    },
];
