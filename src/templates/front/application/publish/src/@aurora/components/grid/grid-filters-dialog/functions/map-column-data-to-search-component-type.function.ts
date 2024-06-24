import { ColumnDataType, SearchComponentType } from '../../grid.types';

export const mapColumnDataToSearchComponentType = (type: ColumnDataType): SearchComponentType =>
{
    switch (type)
    {
        case ColumnDataType.STRING:
            return SearchComponentType.TEXT;
        case ColumnDataType.ENUM:
            return SearchComponentType.SELECT;
        case ColumnDataType.ARRAY:
            return SearchComponentType.MULTIPLE_SELECT;
        case ColumnDataType.NUMBER:
            return SearchComponentType.NUMBER;
        case ColumnDataType.BOOLEAN:
            return SearchComponentType.CHECKBOX;
        case ColumnDataType.DATE:
            return SearchComponentType.DATEPICKER;
        case ColumnDataType.UUID:
            return SearchComponentType.SELECT;
        default:
            return SearchComponentType.TEXT;
    }
};