import { Directive, Input, TemplateRef } from '@angular/core';

@Directive({
    selector: '[auGridElementsManagerCellValueTemplate]',
})
export class GridElementsManagerCellValueTemplateDirective
{
    @Input() field: string;

    constructor(
        public templateRef: TemplateRef<unknown>,
    ) { }
}