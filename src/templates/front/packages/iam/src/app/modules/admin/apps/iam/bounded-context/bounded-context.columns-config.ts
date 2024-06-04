import { ColumnConfig, ColumnDataType } from '@aurora';

export const boundedContextColumnsConfig: ColumnConfig[] = [
    {
        type       : ColumnDataType.STRING,
        field      : 'name',
        sort       : 'name',
        translation: 'Name',
        isUnaccent : true,
    },
    {
        type       : ColumnDataType.STRING,
        field      : 'root',
        sort       : 'root',
        translation: 'iam.Root',
        isUnaccent : true,
    },
    {
        type       : ColumnDataType.NUMBER,
        field      : 'sort',
        sort       : 'sort',
        translation: 'Sort',
    },
    {
        type       : ColumnDataType.BOOLEAN,
        field      : 'isActive',
        sort       : 'isActive',
        translation: 'IsActive',
    },
];
