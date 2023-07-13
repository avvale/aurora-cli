import { ColumnConfig, ColumnDataType } from '@aurora';

export const refreshTokenColumnsConfig: ColumnConfig[] = [
    {
        type       : ColumnDataType.STRING,
        field      : 'accessTokenId',
        sort       : 'accessTokenId',
        translation: 'oAuth.AccessTokenId',
    },
    {
        type       : ColumnDataType.STRING,
        field      : 'token',
        sort       : 'token',
        translation: 'oAuth.Token',
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