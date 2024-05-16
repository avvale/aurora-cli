import { ColumnConfig, ColumnDataType } from '@aurora';

export const fieldColumnsConfig: ColumnConfig[] = [
    {
        type       : ColumnDataType.STRING,
        field      : 'name',
        sort       : 'name',
        translation: 'searchEngine.Name',
    },
    {
        type       : ColumnDataType.STRING,
        field      : 'type',
        sort       : 'type',
        translation: 'searchEngine.Type',
    },
    {
        type       : ColumnDataType.BOOLEAN,
        field      : 'isNullable',
        sort       : 'isNullable',
        translation: 'searchEngine.IsNullable',
    },
];