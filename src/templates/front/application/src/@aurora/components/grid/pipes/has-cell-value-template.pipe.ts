import { Pipe, PipeTransform, QueryList } from '@angular/core';
import { GridCellValueTemplateDirective } from '../directives/grid-cell-value-template.directive';
import { ColumnConfig } from '../grid.types';

/**
 * Check if in current iteration has template directive for current row
 */
@Pipe({
    name: 'hasCellValueTemplate',
    standalone: true,
})
export class HasCellValueTemplatePipe implements PipeTransform
{
    transform(gridCellValuesTemplate: QueryList<GridCellValueTemplateDirective>, columnConfig: ColumnConfig): boolean
    {
        return gridCellValuesTemplate
            .some(
                cellValueTemplate => cellValueTemplate.field === undefined
                || cellValueTemplate.field === columnConfig.field,
            );
    }
}
