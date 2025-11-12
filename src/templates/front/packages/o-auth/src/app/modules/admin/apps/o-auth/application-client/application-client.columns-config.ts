import { ColumnConfig, ColumnDataType } from '@aurora';

export const applicationClientColumnsConfig: ColumnConfig[] = [
    {
        type: ColumnDataType.STRING,
        field: 'application.name',
        searchableField: '$application.name$',
        sort: 'application.name',
        translation: 'Name',
        isUnaccent: true,
    },
    {
        type: ColumnDataType.STRING,
        field: 'client.name',
        searchableField: '$client.name$',
        sort: 'client.name',
        translation: 'Name',
        isUnaccent: true,
    },
];
