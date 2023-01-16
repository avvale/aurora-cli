import { Directive, Input, TemplateRef } from '@angular/core';
import { GridCustomHeaderPosition } from '@aurora/components/grid/grid.types';

@Directive({
    selector: '[auGridSelectElementCustomHeaderTemplate]',
})
export class GridSelectElementCustomHeaderTemplateDirective
{
    @Input() position: GridCustomHeaderPosition;

    constructor(
        public templateRef: TemplateRef<unknown>,
    ) { }
}