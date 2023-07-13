import { Directive, Input, TemplateRef } from '@angular/core';

@Directive({
    selector: '[auGridCellValueTemplate]',
    standalone: true,
})
export class GridCellValueTemplateDirective
{
    @Input() field: string;

    constructor(
        public templateRef: TemplateRef<unknown>,
    ) { }
}