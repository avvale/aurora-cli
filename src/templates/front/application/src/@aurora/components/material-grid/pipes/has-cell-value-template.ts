import { Pipe, PipeTransform, QueryList } from '@angular/core';
import { CellValueTemplateDirective } from '../directives/cell-value-template.directive';
import { ColumnConfig } from '../grid.types';

/**
 * Check if in current iteration has template directive for current row
 */
@Pipe({
    name: 'hasCellValueTemplate',
})
export class HasCellValueTemplatePipe implements PipeTransform
{
    transform(cellValuesTemplate: QueryList<CellValueTemplateDirective>, columnConfig: ColumnConfig): boolean
    {
        return cellValuesTemplate
            .some(
                cellValueTemplate => cellValueTemplate.field === undefined
                || cellValueTemplate.field === columnConfig.field,
            );
    }
}
