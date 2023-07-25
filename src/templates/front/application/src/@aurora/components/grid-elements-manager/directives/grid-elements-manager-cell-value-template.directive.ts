import { Directive, Input, TemplateRef } from '@angular/core';

@Directive({
    selector: '[auGridElementsManagerCellValueTemplate]',
    standalone: true,
})
export class GridElementsManagerCellValueTemplateDirective
{
    @Input() field: string;

    constructor(
        public templateRef: TemplateRef<unknown>,
    ) { }
}