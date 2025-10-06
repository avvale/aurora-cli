import { ColumnConfig, ColumnDataType } from '@aurora';

export const permissionColumnsConfig: ColumnConfig[] = [
    {
        type: ColumnDataType.STRING,
        field: 'name',
        sort: 'name',
        translation: 'Name',
        isUnaccent: true,
    },
];
