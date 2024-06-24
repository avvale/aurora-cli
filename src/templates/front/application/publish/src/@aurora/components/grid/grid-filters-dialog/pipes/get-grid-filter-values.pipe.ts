import { Pipe, PipeTransform } from '@angular/core';
import { ColumnConfig } from '../../grid.types';

/**
 * Get key value for select filter
 */
@Pipe({
    name      : 'getGridFilterValues',
    standalone: true,
})
export class GetGridFiltersValue implements PipeTransform
{
    transform(columnsConfig: ColumnConfig[], field: string): { key: string; value: string; }[]
    {
        const columnConfig = columnsConfig.find(columnConfig => columnConfig.field === field);

        if (!columnConfig.fieldValues) return [];
        return columnConfig.fieldValues();
    }
}
