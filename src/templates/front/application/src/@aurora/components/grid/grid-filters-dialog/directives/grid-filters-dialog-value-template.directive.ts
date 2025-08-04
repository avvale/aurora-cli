import { Directive, Input, TemplateRef } from '@angular/core';

@Directive({
    selector: '[auGridFiltersDialogValueTemplate]',
})
export class GridFiltersDialogValueTemplateDirective
{
    @Input() field: string;

    constructor(
        public templateRef: TemplateRef<unknown>,
    ) { }
}