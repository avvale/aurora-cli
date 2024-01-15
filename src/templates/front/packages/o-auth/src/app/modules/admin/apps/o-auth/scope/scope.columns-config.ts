import { ColumnConfig, ColumnDataType } from '@aurora';

export const scopeColumnsConfig: ColumnConfig[] = [
    {
        type       : ColumnDataType.STRING,
        field      : 'code',
        sort       : 'code',
        translation: 'oAuth.Code',
    },
    {
        type       : ColumnDataType.STRING,
        field      : 'name',
        sort       : 'name',
        translation: 'oAuth.Name',
    },
    {
        type       : ColumnDataType.STRING,
        field      : 'roleIds',
        sort       : 'roleIds',
        translation: 'oAuth.RoleIds',
        hidden     : true,
    },
];