import { ColumnConfig, ColumnDataType } from '@aurora';

export const refreshTokenColumnsConfig: ColumnConfig[] = [
    {
        type       : ColumnDataType.STRING,
        field      : 'token',
        sort       : 'token',
        translation: 'oAuth.Token',
        isUnaccent : true,
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
