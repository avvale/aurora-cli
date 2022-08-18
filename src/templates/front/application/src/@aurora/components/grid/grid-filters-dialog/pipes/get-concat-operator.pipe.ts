import { Pipe, PipeTransform } from '@angular/core';
import { ColumnDataType } from '../../grid.types';

/**
 * Get contact operator that we need
 */
@Pipe({
    name: 'getContactOperator',
})
export class GetContactOperatorPipe implements PipeTransform
{
    transform(columnDataType: ColumnDataType): 'OR' | 'AND'
    {
        switch (columnDataType)
        {
            case ColumnDataType.STRING:
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
