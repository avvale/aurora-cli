import { ColumnConfig, ColumnDataType } from '@aurora';

export const resourceColumnsConfig: ColumnConfig[] = [
    {
        type       : ColumnDataType.STRING,
        field      : 'code',
        sort       : 'code',
        translation: 'common.Code',
    },
    {
        type       : ColumnDataType.STRING,
        field      : 'name',
        sort       : 'name',
        translation: 'common.Name',
    },
    {
        type       : ColumnDataType.BOOLEAN,
        field      : 'isActive',
        sort       : 'isActive',
        translation: 'common.IsActive',
    },
    {
        type       : ColumnDataType.BOOLEAN,
        field      : 'hasAttachments',
        sort       : 'hasAttachments',
        translation: 'common.HasAttachments',
    },
];