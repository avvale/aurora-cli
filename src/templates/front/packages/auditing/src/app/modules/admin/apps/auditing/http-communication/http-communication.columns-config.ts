// ignored file
import { ColumnConfig, ColumnDataType } from '@aurora';

export const httpCommunicationColumnsConfig: ColumnConfig[] = [
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
    {
        type : ColumnDataType.STRING,
        field: 'createdAt',
        sort : 'createdAt',
    },
    {
        type : ColumnDataType.STRING,
        field: 'updatedAt',
        sort : 'updatedAt',
    },
];