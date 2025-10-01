import { ColumnConfig, ColumnDataType } from '@aurora';

export const tenantAccountColumnsConfig: ColumnConfig[] = [
    {
        type: ColumnDataType.STRING,
        field: 'tenant.name',
        searchableField: '$tenant.name$',
        sort: 'tenant.name',
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
