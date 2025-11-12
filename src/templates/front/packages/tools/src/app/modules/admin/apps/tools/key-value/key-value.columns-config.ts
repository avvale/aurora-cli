import { ColumnConfig, ColumnDataType } from '@aurora';

export const keyValueColumnsConfig: ColumnConfig[] = [
    {
        type: ColumnDataType.STRING,
        field: 'key',
        sort: 'key',
        translation: 'tools.Key',
        isUnaccent: true,
    },
    {
        type: ColumnDataType.ENUM,
        field: 'type',
        sort: 'type',
        translation: 'tools.Type',
    },
    {
        type: ColumnDataType.STRING,
        field: 'value',
        sort: 'value',
        translation: 'tools.Value',
        isUnaccent: true,
    },
    {
        type: ColumnDataType.BOOLEAN,
        field: 'isCached',
        sort: 'isCached',
        translation: 'tools.IsCached',
    },
    {
        type: ColumnDataType.BOOLEAN,
        field: 'isActive',
        sort: 'isActive',
        translation: 'tools.IsActive',
    },
    {
        type: ColumnDataType.STRING,
        field: 'description',
        sort: 'description',
        translation: 'tools.Description',
        isUnaccent: true,
    },
];
