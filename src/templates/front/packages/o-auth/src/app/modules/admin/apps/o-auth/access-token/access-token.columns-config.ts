import { ColumnConfig, ColumnDataType } from '@aurora';

export const accessTokenColumnsConfig: ColumnConfig[] = [
    {
        type       : ColumnDataType.STRING,
        field      : 'clientId',
        sort       : 'clientId',
        translation: 'oAuth.ClientId',
    },
    {
        type       : ColumnDataType.STRING,
        field      : 'accountId',
        sort       : 'accountId',
        translation: 'oAuth.AccountId',
    },
    {
        type       : ColumnDataType.STRING,
        field      : 'token',
        sort       : 'token',
        translation: 'oAuth.Token',
    },
    {
        type       : ColumnDataType.STRING,
        field      : 'name',
        sort       : 'name',
        translation: 'oAuth.Name',
    },
    {
        type       : ColumnDataType.BOOLEAN,
        field      : 'isRevoked',
        sort       : 'isRevoked',
        translation: 'oAuth.IsRevoked',
    },
    {
        type       : ColumnDataType.STRING,
        field      : 'expiresAt',
        sort       : 'expiresAt',
        translation: 'oAuth.ExpiresAt',
    },
];