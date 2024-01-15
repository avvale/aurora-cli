import { ColumnConfig, ColumnDataType } from '@aurora';

export const httpCommunicationColumnsConfig: ColumnConfig[] = [
    {
        type       : ColumnDataType.STRING,
        field      : 'createdAt',
        sort       : 'createdAt',
        bodyClass  : 'min-w-48',
        translation: 'Created.M',
    },
    {
        type : ColumnDataType.STRING,
        field: 'tags',
        sort : 'tags',
    },
    {
        type : ColumnDataType.NUMBER,
        field: 'status',
        sort : 'status',
    },
    {
        type : ColumnDataType.STRING,
        field: 'method',
        sort : 'method',
    },
    {
        type : ColumnDataType.STRING,
        field: 'url',
        sort : 'url',
    },
];