import { Directive, Input, TemplateRef } from '@angular/core';
import { GridCustomHeaderPosition } from '@aurora/components/grid/grid.types';

@Directive({
    selector  : '[auGridSelectMultipleCustomHeaderDialogTemplate]',
    standalone: true,
})
export class GridSelectMultipleCustomHeaderDialogTemplateDirective
{
    @Input() position: GridCustomHeaderPosition;

    constructor(
        public templateRef: TemplateRef<unknown>,
    ) { }
}