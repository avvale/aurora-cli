import { ColumnConfig, ColumnDataType } from '@aurora';

export const attachmentFamilyColumnsConfig: ColumnConfig[] = [
    {
        type       : ColumnDataType.STRING,
        field      : 'resourceId',
        sort       : 'resourceId',
        translation: 'common.ResourceId',
    },
    {
        type       : ColumnDataType.STRING,
        field      : 'name',
        sort       : 'name',
        translation: 'common.Name',
    },
    {
        type       : ColumnDataType.NUMBER,
        field      : 'width',
        sort       : 'width',
        translation: 'common.Width',
    },
    {
        type       : ColumnDataType.NUMBER,
        field      : 'height',
        sort       : 'height',
        translation: 'common.Height',
    },
    {
        type       : ColumnDataType.STRING,
        field      : 'fitType',
        sort       : 'fitType',
        translation: 'common.FitType',
    },
    {
        type       : ColumnDataType.NUMBER,
        field      : 'quality',
        sort       : 'quality',
        translation: 'common.Quality',
    },
    {
        type       : ColumnDataType.STRING,
        field      : 'sizes',
        sort       : 'sizes',
        translation: 'common.Sizes',
    },
    {
        type       : ColumnDataType.STRING,
        field      : 'format',
        sort       : 'format',
        translation: 'common.Format',
    },
];