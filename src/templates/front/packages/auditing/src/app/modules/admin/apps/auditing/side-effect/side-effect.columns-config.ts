import { ColumnConfig, ColumnDataType } from '@aurora';

export const sideEffectColumnsConfig: ColumnConfig[] = [
    {
        type : ColumnDataType.STRING,
        field: 'tags',
        sort : 'tags',
    },
    {
        type     : ColumnDataType.STRING,
        field    : 'createdAt',
        sort     : 'createdAt',
        bodyClass: 'min-w-48',
    },
    {
        type : ColumnDataType.STRING,
        field: 'modelName',
        sort : 'modelName',
    },
    {
        type : ColumnDataType.STRING,
        field: 'email',
        sort : 'email',
    },
    {
        type : ColumnDataType.STRING,
        field: 'event',
        sort : 'event',
    },
    {
        type : ColumnDataType.STRING,
        field: 'auditableId',
        sort : 'auditableId',
    },
    {
        type : ColumnDataType.STRING,
        field: 'ip',
        sort : 'ip',
    },
    {
        type : ColumnDataType.STRING,
        field: 'method',
        sort : 'method',
    },
    {
        type : ColumnDataType.STRING,
        field: 'baseUrl',
        sort : 'baseUrl',
    },
    {
        type : ColumnDataType.STRING,
        field: 'params',
        sort : 'params',
    },
    {
        type : ColumnDataType.STRING,
        field: 'query',
        sort : 'query',
    },
    {
        type : ColumnDataType.STRING,
        field: 'userAgent',
        sort : 'userAgent',
    },
    {
        type : ColumnDataType.BOOLEAN,
        field: 'isRollback',
        sort : 'isRollback',
    },
];