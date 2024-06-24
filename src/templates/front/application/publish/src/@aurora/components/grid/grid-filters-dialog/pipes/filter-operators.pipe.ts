import { Pipe, PipeTransform } from '@angular/core';
import { FilterCriteriaOperator, SearchComponentType } from '../../grid.types';

/**
 * filter operator accord column type
 */
@Pipe({
    name      : 'filterOperators',
    standalone: true,
})
export class FilterOperatorsPipe implements PipeTransform
{
    transform(filterOperators: FilterCriteriaOperator[], searchComponentType: SearchComponentType): FilterCriteriaOperator[]
    {
        return filterOperators
            .filter(filterOperator => filterOperator.searchComponentTypes.includes(searchComponentType));
    }
}
