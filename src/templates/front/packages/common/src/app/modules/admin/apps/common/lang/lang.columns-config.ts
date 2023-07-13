import { ColumnConfig, ColumnDataType } from '@aurora';

export const langColumnsConfig: ColumnConfig[] = [
    {
        type       : ColumnDataType.STRING,
        field      : 'name',
        sort       : 'name',
        translation: 'Name',
    },
    {
        type       : ColumnDataType.STRING,
        field      : 'image',
        sort       : 'image',
        translation: 'Image',
    },
    {
        type       : ColumnDataType.STRING,
        field      : 'iso6392',
        sort       : 'iso6392',
        translation: 'common.Iso6392',
    },
    {
        type       : ColumnDataType.STRING,
        field      : 'iso6393',
        sort       : 'iso6393',
        translation: 'common.Iso6393',
    },
    {
        type       : ColumnDataType.STRING,
        field      : 'ietf',
        sort       : 'ietf',
        translation: 'common.Ietf',
    },
    {
        type       : ColumnDataType.STRING,
        field      : 'customCode',
        sort       : 'customCode',
        translation: 'common.CustomCode',
    },
    {
        type       : ColumnDataType.STRING,
        field      : 'dir',
        sort       : 'dir',
        translation: 'common.Dir',
    },
    {
        type       : ColumnDataType.NUMBER,
        field      : 'sort',
        sort       : 'sort',
        translation: 'common.Sort',
    },
    {
        type       : ColumnDataType.BOOLEAN,
        field      : 'isActive',
        sort       : 'isActive',
        translation: 'common.IsActive',
    },
];