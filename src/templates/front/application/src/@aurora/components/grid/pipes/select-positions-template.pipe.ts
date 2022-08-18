import { Pipe, PipeTransform, QueryList } from '@angular/core';
import { GridCustomHeaderTemplateDirective } from '../directives/grid-custom-header-template.directive';
import { GridCustomHeaderPosition } from '../grid.types';

/**
 * Check which action to perform depending on whether or not the language exists.
 */
@Pipe({
    name: 'filterGridCustomHeaderTemplatesPositionPipe',
})
export class FilterGridCustomHeaderTemplatesPositionPipe implements PipeTransform
{
    transform(gridCustomHeaderTemplates: QueryList<GridCustomHeaderTemplateDirective>, position: GridCustomHeaderPosition): GridCustomHeaderTemplateDirective[]
    {
        return gridCustomHeaderTemplates
            .filter(
                (customGridHeaderTemplate: GridCustomHeaderTemplateDirective) => customGridHeaderTemplate.position === position,
            );
    }
}
