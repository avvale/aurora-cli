import { ColumnConfig, ColumnDataType } from '@aurora';

export const permissionColumnsConfig: ColumnConfig[] = [
    {
        type       : ColumnDataType.STRING,
        field      : 'name',
        sort       : 'name',
        translation: 'iam.Name',
        isUnaccent : true,
    },
];
