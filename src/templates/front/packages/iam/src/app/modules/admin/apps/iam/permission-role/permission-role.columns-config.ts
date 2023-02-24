import { ColumnConfig, ColumnDataType } from '@aurora';

export const permissionRoleColumnsConfig: ColumnConfig[] = [
    {
        type       : ColumnDataType.STRING,
        field      : 'permission.name',
        sort       : 'permission.name',
        translation: 'Name',
    },
];