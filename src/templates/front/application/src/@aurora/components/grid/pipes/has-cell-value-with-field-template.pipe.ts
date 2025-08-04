import { Pipe, PipeTransform, QueryList } from '@angular/core';
import { GridCellValueTemplateDirective } from '../directives/grid-cell-value-template.directive';
import { ColumnConfig } from '../grid.types';

/**
 * Check if in current iteration has template directive for current row with field
 */
@Pipe({
    name: 'hasCellValueWithFieldTemplate',
})
export class HasCellValueWithFieldTemplatePipe implements PipeTransform
{
    transform(gridCellValuesTemplate: QueryList<GridCellValueTemplateDirective>, columnConfig: ColumnConfig): boolean
    {
        return !!gridCellValuesTemplate
            .find(
                cellValueTemplate => cellValueTemplate.field === columnConfig.field,
            );
    }
}
