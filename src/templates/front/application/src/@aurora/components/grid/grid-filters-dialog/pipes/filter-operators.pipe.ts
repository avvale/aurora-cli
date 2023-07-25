import { Pipe, PipeTransform } from '@angular/core';
import { FilterColumnDataType, FilterCriteriaOperator } from '../../grid.types';

/**
 * filter operator accord column type
 */
@Pipe({
    name: 'filterOperators',
    standalone: true,
})
export class FilterOperatorsPipe implements PipeTransform
{
    transform(filterOperators: FilterCriteriaOperator[], columnDataType: FilterColumnDataType): FilterCriteriaOperator[]
    {
        return filterOperators.filter(filterOperator => filterOperator.types.includes(columnDataType));
    }
}
