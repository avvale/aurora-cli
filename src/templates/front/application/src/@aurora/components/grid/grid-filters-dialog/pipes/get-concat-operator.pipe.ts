import { Pipe, PipeTransform } from '@angular/core';
import { ColumnDataType } from '../../grid.types';

/**
 * Get concat operator that we need
 */
@Pipe({
    name: 'getConcatOperator',
})
export class GetConcatOperatorPipe implements PipeTransform
{
    transform(columnDataType: ColumnDataType): 'OR' | 'AND'
    {
        switch (columnDataType)
        {
            case ColumnDataType.STRING:
                return 'OR';
            case ColumnDataType.ENUM:
                return 'OR';
            case ColumnDataType.BOOLEAN:
                return 'OR';
            case ColumnDataType.NUMBER:
                return 'AND';
            case ColumnDataType.DATE:
                return 'AND';
            default:
                return 'OR';
        }
    }
}
