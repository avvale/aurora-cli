import { Pipe, PipeTransform, QueryList } from '@angular/core';
import { CellValueTemplateDirective } from '../directives/cell-value-template.directive';
import { ColumnConfig } from '../grid.types';

/**
 * Check if in current iteration has template directive for current row with field
 */
@Pipe({
    name: 'hasCellValueWithFieldTemplate',
})
export class HasCellValueWithFieldTemplatePipe implements PipeTransform
{
    transform(cellValuesTemplate: QueryList<CellValueTemplateDirective>, columnConfig: ColumnConfig): boolean
    {
        return !!cellValuesTemplate
            .find(
                cellValueTemplate => cellValueTemplate.field === columnConfig.field,
            );
    }
}
