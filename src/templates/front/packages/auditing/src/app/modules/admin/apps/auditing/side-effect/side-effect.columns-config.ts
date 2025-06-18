import { ColumnConfig, ColumnDataType } from '@aurora';

export const sideEffectColumnsConfig: ColumnConfig[] = [
    {
        type : ColumnDataType.ARRAY,
        field: 'tags',
        sort : 'tags',
    },
    {
        type       : ColumnDataType.DATE,
        field      : 'createdAt',
        sort       : 'createdAt',
        bodyClass  : 'min-w-48',
        translation: 'Created.M',
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
        type : ColumnDataType.ENUM,
        field: 'event',
        sort : 'event',
    },
    {
        type : ColumnDataType.STRING,
        field: 'auditableId',
        sort : 'auditableId',
        hidden: true,
    },
    {
        type : ColumnDataType.STRING,
        field: 'ip',
        sort : 'ip',
    },
    {
        type : ColumnDataType.ENUM,
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
        field: 'userAgent',
        sort : 'userAgent',
        hidden: true,
    },
    {
        type : ColumnDataType.BOOLEAN,
        field: 'isRollback',
        sort : 'isRollback',
    },
];