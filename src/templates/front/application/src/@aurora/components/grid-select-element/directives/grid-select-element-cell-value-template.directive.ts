import { Directive, Input, TemplateRef } from '@angular/core';

@Directive({
    selector: '[auGridSelectElementCellValueTemplate]',
    standalone: true,
})
export class GridSelectElementCellValueTemplateDirective
{
    @Input() field: string;

    constructor(
        public templateRef: TemplateRef<unknown>,
    ) { }
}