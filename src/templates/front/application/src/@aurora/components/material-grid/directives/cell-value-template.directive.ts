import { Directive, Input, TemplateRef } from '@angular/core';

@Directive({
    selector: '[auCellValueTemplate]',
})
export class CellValueTemplateDirective
{
    @Input() field: string;

    constructor(
        public templateRef: TemplateRef<unknown>,
    ) { }
}