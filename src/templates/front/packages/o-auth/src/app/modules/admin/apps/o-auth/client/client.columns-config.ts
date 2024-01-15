import { ColumnConfig, ColumnDataType } from '@aurora';

export const clientColumnsConfig: ColumnConfig[] = [
    {
        type       : ColumnDataType.ENUM,
        field      : 'grantType',
        sort       : 'grantType',
        translation: 'oAuth.GrantType',
    },
    {
        type       : ColumnDataType.STRING,
        field      : 'name',
        sort       : 'name',
        translation: 'oAuth.Name',
    },
    {
        type       : ColumnDataType.STRING,
        field      : 'secret',
        sort       : 'secret',
        translation: 'oAuth.Secret',
    },
    {
        type       : ColumnDataType.STRING,
        field      : 'authUrl',
        sort       : 'authUrl',
        translation: 'oAuth.AuthUrl',
    },
    {
        type       : ColumnDataType.STRING,
        field      : 'redirect',
        sort       : 'redirect',
        translation: 'oAuth.Redirect',
    },
    {
        type       : ColumnDataType.STRING,
        field      : 'scopes',
        sort       : 'scopes',
        translation: 'oAuth.Scopes',
    },
    {
        type       : ColumnDataType.NUMBER,
        field      : 'expiredAccessToken',
        sort       : 'expiredAccessToken',
        translation: 'oAuth.ExpiredAccessToken',
    },
    {
        type       : ColumnDataType.NUMBER,
        field      : 'expiredRefreshToken',
        sort       : 'expiredRefreshToken',
        translation: 'oAuth.ExpiredRefreshToken',
    },
    {
        type       : ColumnDataType.BOOLEAN,
        field      : 'isActive',
        sort       : 'isActive',
        translation: 'oAuth.IsActive',
    },
    {
        type       : ColumnDataType.BOOLEAN,
        field      : 'isMaster',
        sort       : 'isMaster',
        translation: 'oAuth.IsMaster',
    },
];