import { ColumnConfig, ColumnDataType } from '@aurora';

export const migrationColumnsConfig: ColumnConfig[] = [
    {
        type: ColumnDataType.STRING,
        field: 'name',
        sort: 'name',
        translation: 'tools.Name',
        isUnaccent: true,
    },
    {
        type: ColumnDataType.STRING,
        field: 'version',
        sort: 'version',
        translation: 'tools.Version',
        isUnaccent: true,
    },
    {
        type: ColumnDataType.BOOLEAN,
        field: 'isActive',
        sort: 'isActive',
        translation: 'tools.IsActive',
    },
    {
        type: ColumnDataType.BOOLEAN,
        field: 'isExecuted',
        sort: 'isExecuted',
        translation: 'tools.IsExecuted',
    },
    {
        type: ColumnDataType.NUMBER,
        field: 'sort',
        sort: 'sort',
        translation: 'Sort',
    },
    {
        type: ColumnDataType.TIMESTAMP,
        field: 'executedAt',
        sort: 'executedAt',
        translation: 'tools.ExecutedAt',
        bodyClass: 'min-w-48',
    },
];
