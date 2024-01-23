import { ColumnConfig, ColumnDataType } from '@aurora';

export const tenantColumnsConfig: ColumnConfig[] = [
    {
        type       : ColumnDataType.STRING,
        field      : 'name',
        sort       : 'name',
        translation: 'iam.Name',
        isUnaccent : true,
    },
    {
        type       : ColumnDataType.STRING,
        field      : 'code',
        sort       : 'code',
        translation: 'iam.Code',
        isUnaccent : true,
    },
    {
        type       : ColumnDataType.STRING,
        field      : 'logo',
        sort       : 'logo',
        translation: 'iam.Logo',
        searchable : false,
    },
    {
        type       : ColumnDataType.BOOLEAN,
        field      : 'isActive',
        sort       : 'isActive',
        translation: 'iam.IsActive',
        searchable : false,
    },
];