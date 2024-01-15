import { ColumnConfig, ColumnDataType } from '@aurora';

export const accountColumnsConfig: ColumnConfig[] = [
    {
        type       : ColumnDataType.ENUM,
        field      : 'type',
        sort       : 'type',
        translation: 'iam.Type',
    },
    {
        type       : ColumnDataType.STRING,
        field      : 'code',
        sort       : 'code',
        translation: 'iam.Code',
    },
    {
        type       : ColumnDataType.STRING,
        field      : 'scopes',
        sort       : 'scopes',
        translation: 'iam.Scopes',
    },
    {
        type       : ColumnDataType.STRING,
        field      : 'email',
        sort       : 'email',
        translation: 'iam.Email',
    },
    {
        type       : ColumnDataType.BOOLEAN,
        field      : 'isActive',
        sort       : 'isActive',
        translation: 'iam.IsActive',
    },
];