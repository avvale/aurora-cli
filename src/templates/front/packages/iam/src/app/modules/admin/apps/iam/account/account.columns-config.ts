import { ColumnConfig, ColumnDataType } from '@aurora';

export const accountColumnsConfig: ColumnConfig[] = [
    {
        type: ColumnDataType.ENUM,
        field: 'type',
        sort: 'type',
        translation: 'Type',
    },
    {
        type: ColumnDataType.STRING,
        field: 'code',
        sort: 'code',
        translation: 'Code',
    },
    {
        type: ColumnDataType.ARRAY,
        field: 'scopes',
        sort: 'scopes',
        translation: 'iam.Scopes',
    },
    {
        type: ColumnDataType.STRING,
        field: 'email',
        sort: 'email',
        translation: 'Email',
    },
    {
        type: ColumnDataType.STRING,
        field: 'username',
        sort: 'username',
        translation: 'Username',
    },
    {
        type: ColumnDataType.BOOLEAN,
        field: 'isActive',
        sort: 'isActive',
        translation: 'Active',
    },
];
