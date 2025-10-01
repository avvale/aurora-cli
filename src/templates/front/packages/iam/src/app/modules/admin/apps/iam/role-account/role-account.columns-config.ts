import { ColumnConfig, ColumnDataType } from '@aurora';

export const roleAccountColumnsConfig: ColumnConfig[] = [
    {
        type: ColumnDataType.STRING,
        field: 'role.name',
        searchableField: '$role.name$',
        sort: 'role.name',
        translation: 'Name',
        isUnaccent: true,
    },
    {
        type: ColumnDataType.STRING,
        field: 'account.name',
        searchableField: '$account.name$',
        sort: 'account.name',
        translation: 'Name',
        isUnaccent: true,
    },
];
