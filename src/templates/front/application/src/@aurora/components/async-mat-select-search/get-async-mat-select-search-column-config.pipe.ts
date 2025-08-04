import { Pipe, PipeTransform } from '@angular/core';
import { ColumnConfig } from '../grid';

// Get key value for select filter
@Pipe({
    name: 'getAsyncMatSelectSearchColumnConfig',
})
export class GetAsyncMatSelectSearchColumnConfig implements PipeTransform
{
    transform(columnsConfig: ColumnConfig[], field: string): any
    {
        const columnConfig = columnsConfig.find(columnConfig => columnConfig.field === field);

        if (!columnConfig?.meta?.asyncMatSelectSearch)
        {
            throw new Error(`
ColumnConfig with field ${field},
does not have asyncMatSelectSearch meta, you need define asyncMatSelectSearch to use ASYNC_MULTIPLE_SELECT.
`);
        }
        return columnConfig.meta.asyncMatSelectSearch;
    }
}
