import { ColumnConfig, ColumnDataType } from '@aurora';

export const accessTokenColumnsConfig: ColumnConfig[] = [
    {
        type : ColumnDataType.STRING,
        field: 'clientId',
        sort : 'clientId',
    },
    {
        type : ColumnDataType.STRING,
        field: 'accountId',
        sort : 'accountId',
    },
    {
        type : ColumnDataType.STRING,
        field: 'token',
        sort : 'token',
    },
    {
        type : ColumnDataType.STRING,
        field: 'name',
        sort : 'name',
    },
    {
        type : ColumnDataType.BOOLEAN,
        field: 'isRevoked',
        sort : 'isRevoked',
    },
    {
        type : ColumnDataType.STRING,
        field: 'expiresAt',
        sort : 'expiresAt',
    },
];