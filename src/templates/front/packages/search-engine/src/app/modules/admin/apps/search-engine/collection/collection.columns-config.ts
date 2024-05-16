import { ColumnConfig, ColumnDataType } from '@aurora';

export const collectionColumnsConfig: ColumnConfig[] = [
    {
        type       : ColumnDataType.STRING,
        field      : 'name',
        sort       : 'name',
        translation: 'searchEngine.Name',
    },
    {
        type       : ColumnDataType.STRING,
        field      : 'alias',
        sort       : 'alias',
        translation: 'searchEngine.Alias',
    },
    {
        type       : ColumnDataType.ENUM,
        field      : 'status',
        sort       : 'status',
        translation: 'searchEngine.Status',
    },
    {
        type       : ColumnDataType.NUMBER,
        field      : 'documentsNumber',
        sort       : 'documentsNumber',
        translation: 'searchEngine.DocumentsNumber',
    },
    {
        type       : ColumnDataType.STRING,
        field      : 'defaultSortingField',
        sort       : 'defaultSortingField',
        translation: 'searchEngine.DefaultSortingField',
    },
    {
        type       : ColumnDataType.NUMBER,
        field      : 'numMemoryShards',
        sort       : 'numMemoryShards',
        translation: 'searchEngine.NumMemoryShards',
    },
    {
        type       : ColumnDataType.NUMBER,
        field      : 'timestampCreatedAt',
        sort       : 'timestampCreatedAt',
        translation: 'searchEngine.TimestampCreatedAt',
    },
    {
        type       : ColumnDataType.BOOLEAN,
        field      : 'isEnableNestedFields',
        sort       : 'isEnableNestedFields',
        translation: 'searchEngine.IsEnableNestedFields',
    },
];