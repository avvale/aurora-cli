import { ColumnConfig, ColumnDataType } from '@aurora';

export const clientColumnsConfig: ColumnConfig[] = [
    {
        type : ColumnDataType.STRING,
        field: 'grantType',
        sort : 'grantType',
    },
    {
        type : ColumnDataType.STRING,
        field: 'name',
        sort : 'name',
    },
    {
        type : ColumnDataType.STRING,
        field: 'secret',
        sort : 'secret',
    },
    {
        type : ColumnDataType.STRING,
        field: 'authUrl',
        sort : 'authUrl',
    },
    {
        type : ColumnDataType.STRING,
        field: 'redirect',
        sort : 'redirect',
    },
    {
        type : ColumnDataType.STRING,
        field: 'scopes',
        sort : 'scopes',
    },
    {
        type : ColumnDataType.NUMBER,
        field: 'expiredAccessToken',
        sort : 'expiredAccessToken',
    },
    {
        type : ColumnDataType.NUMBER,
        field: 'expiredRefreshToken',
        sort : 'expiredRefreshToken',
    },
    {
        type : ColumnDataType.BOOLEAN,
        field: 'isActive',
        sort : 'isActive',
    },
    {
        type : ColumnDataType.BOOLEAN,
        field: 'isMaster',
        sort : 'isMaster',
    },
];