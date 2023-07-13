import { Pipe, PipeTransform } from '@angular/core';
import { GridColumnFilter } from '../../grid.types';

/**
 * Check if in has draw field linking brackets
 */
@Pipe({
    name: 'hasRenderOutbox',
    standalone: true,
})
export class HasRenderOutboxPipe implements PipeTransform
{
    transform(arrayColumnFilters: GridColumnFilter[], gridColumnFilter: GridColumnFilter): boolean
    {
        for (const [index, value] of arrayColumnFilters.entries())
        {
            if (value.id === gridColumnFilter.id)
            {
                if (arrayColumnFilters.length === index + 1) return false;
                if (arrayColumnFilters[index + 1].field === value.field) return true;
                return false;
            }
        }
    }
}
