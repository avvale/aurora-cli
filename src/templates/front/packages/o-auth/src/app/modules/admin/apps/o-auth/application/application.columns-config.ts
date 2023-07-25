import { ColumnConfig, ColumnDataType } from '@aurora';

export const applicationColumnsConfig: ColumnConfig[] = [
    {
        type       : ColumnDataType.STRING,
        field      : 'code',
        sort       : 'code',
        translation: 'oAuth.Code',
    },
    {
        type       : ColumnDataType.STRING,
        field      : 'name',
        sort       : 'name',
        translation: 'oAuth.Name',
    },
    {
        type       : ColumnDataType.STRING,
        field      : 'secret',
        sort       : 'secret',
        translation: 'oAuth.Secret',
    },
    {
        type       : ColumnDataType.BOOLEAN,
        field      : 'isMaster',
        sort       : 'isMaster',
        translation: 'oAuth.IsMaster',
    },
];