import { Pipe, PipeTransform, QueryList } from '@angular/core';
import { GridFiltersDialogValueTemplateDirective } from '../directives/grid-filters-dialog-value-template.directive';

/**
 * Get key value for select filter
 */
@Pipe({
    name: 'getGridFilterValue',
})
export class GetGridFilterValue implements PipeTransform
{
    transform(gridFiltersDialogValues:  QueryList<GridFiltersDialogValueTemplateDirective>, field: string): GridFiltersDialogValueTemplateDirective
    {
        const filtersDialogValue = gridFiltersDialogValues.find(columnConfig => columnConfig.field === field);
        return filtersDialogValue;
    }
}
