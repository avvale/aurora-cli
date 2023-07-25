import { Directive, Input, TemplateRef } from '@angular/core';
import { GridCustomHeaderPosition } from '../grid.types';

@Directive({
    selector  : '[auGridCustomHeaderTemplate]',
    standalone: true,
})
export class GridCustomHeaderTemplateDirective
{
    @Input() position: GridCustomHeaderPosition;

    constructor(
        public templateRef: TemplateRef<unknown>,
    ) { }
}