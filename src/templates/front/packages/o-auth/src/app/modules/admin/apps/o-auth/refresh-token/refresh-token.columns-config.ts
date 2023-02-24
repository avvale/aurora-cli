import { ColumnConfig, ColumnDataType } from '@aurora';

export const refreshTokenColumnsConfig: ColumnConfig[] = [
    {
        type : ColumnDataType.STRING,
        field: 'accessTokenId',
        sort : 'accessTokenId',
    },
    {
        type : ColumnDataType.STRING,
        field: 'token',
        sort : 'token',
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