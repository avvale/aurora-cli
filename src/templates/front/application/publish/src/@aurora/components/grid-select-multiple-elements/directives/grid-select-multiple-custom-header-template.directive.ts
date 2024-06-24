import { Directive, Input, TemplateRef } from '@angular/core';
import { GridCustomHeaderPosition } from '@aurora/components/grid/grid.types';

@Directive({
    selector  : '[auGridSelectMultipleCustomHeaderTemplate]',
    standalone: true,
})
export class GridSelectMultipleCustomHeaderTemplateDirective
{
    @Input() position: GridCustomHeaderPosition;

    constructor(
        public templateRef: TemplateRef<unknown>,
    ) { }
}