import { ColumnConfig, ColumnDataType } from '@aurora';

export const applicationColumnsConfig: ColumnConfig[] = [
    {
        type       : ColumnDataType.STRING,
        field      : 'code',
        sort       : 'code',
        translation: 'oAuth.Code',
        isUnaccent : true,
    },
    {
        type       : ColumnDataType.STRING,
        field      : 'name',
        sort       : 'name',
        translation: 'oAuth.Name',
        isUnaccent : true,
    },
    {
        type       : ColumnDataType.STRING,
        field      : 'secret',
        sort       : 'secret',
        translation: 'oAuth.Secret',
        isUnaccent : true,
    },
    {
        type       : ColumnDataType.BOOLEAN,
        field      : 'isMaster',
        sort       : 'isMaster',
        translation: 'oAuth.IsMaster',
    },
];
