import { ColumnConfig, ColumnDataType } from '@aurora';

export const administrativeAreaLevel2ColumnsConfig: ColumnConfig[] = [
    {
        type       : ColumnDataType.STRING,
        field      : 'code',
        sort       : 'code',
        translation: 'common.Code',
    },
    {
        type       : ColumnDataType.STRING,
        field      : 'customCode',
        sort       : 'customCode',
        translation: 'common.CustomCode',
    },
    {
        type       : ColumnDataType.STRING,
        field      : 'name',
        sort       : 'name',
        translation: 'common.Name',
    },
    {
        type       : ColumnDataType.STRING,
        field      : 'slug',
        sort       : 'slug',
        translation: 'common.Slug',
    },
    {
        type       : ColumnDataType.NUMBER,
        field      : 'latitude',
        sort       : 'latitude',
        translation: 'common.Latitude',
    },
    {
        type       : ColumnDataType.NUMBER,
        field      : 'longitude',
        sort       : 'longitude',
        translation: 'common.Longitude',
    },
    {
        type       : ColumnDataType.NUMBER,
        field      : 'zoom',
        sort       : 'zoom',
        translation: 'common.Zoom',
    },
    {
        type       : ColumnDataType.ENUM,
        field      : 'mapType',
        sort       : 'mapType',
        translation: 'common.MapType',
    },
];